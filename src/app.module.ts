import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule } from '@nestjs/config'
import { APP_INTERCEPTOR, APP_FILTER } from '@nestjs/core'
import Entities from '@/typeorm'

import { AppController } from './app.controller'
import { AuthModule } from './modules/auth/auth.module'
import { TagModule } from './modules/tag/tag.module'
import { UserModule } from './modules/user/user.module'
import { ArticleModule } from './modules/article/article.module'
import { TransformInterceptor } from './interceptor/transform.interceptor'
import { AppIntercepter } from './interceptor/app.interceptor'
import { HttpExceptionFilter } from './filter/http.execption.filter'
import configuration from './config/configuration'

@Module({
	imports: [
		TypeOrmModule.forRoot({
			type: 'mysql',
			host: '39.98.50.162',
			port: 3306,
			username: 'score',
			password: 'Ma13578960..',
			database: 'score',
			entities: Entities,
			synchronize: true,
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
