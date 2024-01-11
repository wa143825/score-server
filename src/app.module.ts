import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule } from '@nestjs/config'
import { ScheduleModule } from "@nestjs/schedule";
import { APP_INTERCEPTOR, APP_FILTER, APP_GUARD } from '@nestjs/core'
import Entities from '@/typeorm'

// 日志
import { WinstonModule } from 'nest-winston'
import * as winston from 'winston';
import { format } from 'winston';
import 'winston-daily-rotate-file'

import { AppController } from './app.controller'
import { ArticleModule } from './modules/article/article.module'
import { TransformInterceptor } from './interceptor/transform.interceptor'
import { AppIntercepter } from './interceptor/app.interceptor'
import { HttpExceptionFilter } from './filter/http.execption.filter'
import configuration from './config/configuration'

import { CategoryModule } from './modules/category/category.module'
import { AuthModule } from './modules/auth/auth.module'
import { TagModule } from './modules/tag/tag.module'
import { UserModule } from './modules/user/user.module'
import { OrganizeModule } from './modules/organize/organize.module'
import { FilesModule } from './modules/files/files.module'
import { SocketModule } from './modules/socket/socket.module';

import { JwtAuthGuard } from './modules/auth/auth.guard';
import { TokenModule } from './providers/token/token.module';
import { TaskModule } from './providers/task/task.module';

import { TokenMiddleware } from '@/middleware/token.middleware'

@Module({
	imports: [
		TypeOrmModule.forRoot({
			type: 'mysql',
			host: 'localhost',
			port: 3307,
			username: 'root',
			password: '123456',
			database: 'score',
			entities: Entities,
			synchronize: true,
			dateStrings: true,
		}),
		ConfigModule.forRoot({
			load: [configuration],
			ignoreEnvFile: false,
			isGlobal: true,
			cache: true,
			envFilePath: '.env',
		}),
		WinstonModule.forRoot({
			format: format.combine(
				winston.format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss',
      	}),
				winston.format.printf((info) => {   // 定义文件输出内容
					return `时间:${info.timestamp},日志类型:${info.level},${info?.context ? `运行背景: ${info.context},` : '' }日志信息: ${info.message}`
				})
			),
			transports: [
        new winston.transports.DailyRotateFile({
          level: 'warn',
          filename: 'logs/warn/%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          zippedArchive: true,
          maxSize: '10m',
          maxFiles: '30d'
        }),
			],
			// 未捕获的异常
			exceptionHandlers: [
				new winston.transports.File({ filename: 'logs/exceptions.log' })
			]
		}),
		ScheduleModule.forRoot(),
		AuthModule,
		TagModule,
		ArticleModule,
		CategoryModule,
		UserModule,
		OrganizeModule,
		FilesModule,
		TokenModule,
		TaskModule,
		ScheduleModule,
		SocketModule
	],
	providers: [
		{
			provide: APP_INTERCEPTOR,
			useClass: TransformInterceptor,
		},
		{
			provide: APP_INTERCEPTOR,
			useClass: AppIntercepter,
		},
		{
			provide: APP_FILTER,
			useClass: HttpExceptionFilter,
		},
		{
			provide: APP_GUARD,
			useClass: JwtAuthGuard
		}
	],
	controllers: [AppController],
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
			consumer
				.apply(TokenMiddleware)
				.forRoutes('*')
	}
}
