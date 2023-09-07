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
					// 1、修改成功，只返回200
					return res
				} else if (data) {
					// 2、有数据，为列表则返回row, 对象为data
					return data instanceof Array ? {...res, row: data} : {...res, data}
				} else {
					// 3、无数据则返回400
					return {
						code: 400,
						msg: '数据未找到'
					}
				}
			}),
		)
	}
}
