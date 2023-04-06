import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus, HttpException } from '@nestjs/common'
import { FastifyRequest, FastifyReply } from 'fastify'

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
	catch(exception: unknown, host: ArgumentsHost) {
		const ctx = host.switchToHttp()
		const response = ctx.getResponse<FastifyReply>()
		const request = ctx.getRequest<FastifyRequest>()
		const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR
		console.log(exception)

		if (exception instanceof HttpException) {
			return response.status(status).send({
				code: status,
				path: request.url,
				msg: exception.message,
			})
		}
		response.status(status).send({
			code: status,
			path: request.url,
			msg: '服务器错误，请联系管理员',
		})
	}
}
