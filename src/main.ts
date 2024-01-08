import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { ValidatoionPipe } from '@/pipes/validation.pipe'
import { AppModule } from './app.module'
import { join } from 'path'
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston'

declare const module: any

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule, {
		logger: ['error','warn']
	})

	app.useGlobalPipes(new ValidatoionPipe())
	app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER))
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
