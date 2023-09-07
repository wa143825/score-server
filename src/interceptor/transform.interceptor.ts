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
				let res = {
					code: 200,
					msg
				}
				if (data === true) {
					return res
				} else {
					return data instanceof Array ? {...res, row: data} : {...res, data}
				}
			}),
		)
	}
}
