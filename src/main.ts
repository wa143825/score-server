import { NestFactory } from '@nestjs/core'
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'
import { ValidatoionPipe } from '@/pipes/validation.pipe'
import { AppModule } from './app.module'

async function bootstrap() {
	const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter())

	app.useGlobalPipes(new ValidatoionPipe())

	await app.listen(3000)
}
bootstrap()
