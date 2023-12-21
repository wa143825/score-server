import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { ValidatoionPipe } from '@/pipes/validation.pipe'
import { AppModule } from './app.module'
import { join } from 'path'

declare const module: any

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule)

	app.useGlobalPipes(new ValidatoionPipe())
	app.useStaticAssets(
		join(__dirname, '..', '/static'), {
			prefix : '/static'
		}
	)

	await app.listen(3000)

	if (module.hot) {
		module.hot.accept()
		module.hot.dispose(() => app.close())
	}
}

bootstrap()
