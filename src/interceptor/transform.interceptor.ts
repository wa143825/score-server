import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

@Injectable()
export class TransformInterceptor implements NestInterceptor {
	constructor(private readonly ref: Reflector) {}

	intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
		const target = context.getHandler()
		const msg = this.ref.get('msg', target)
		return next.handle().pipe(
			map((data) => {
				if (data === true) {
					return {
						code: 200,
						msg,
					}
				} else {
					return {
						code: 200,
						msg,
						data,
					}
				}
			}),
		)
	}
}
