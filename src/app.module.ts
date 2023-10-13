import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule } from '@nestjs/config'
import { APP_INTERCEPTOR, APP_FILTER } from '@nestjs/core'
import Entities from '@/typeorm'

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
			dateStrings: true
		}),
		ConfigModule.forRoot({
			load: [configuration],
			ignoreEnvFile: false,
			isGlobal: true,
			cache: true,
			envFilePath: '.env',
		}),
		AuthModule,
		TagModule,
		ArticleModule,
		CategoryModule,
		UserModule,
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
	],
	controllers: [AppController],
})
export class AppModule {}
