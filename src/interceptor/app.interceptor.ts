import { ClassSerializerInterceptor } from '@nestjs/common'
import { isArray, isNil, isObject } from 'lodash'
import { ClassTransformOptions } from 'class-transformer'
import { PlainLiteralObject } from '@nestjs/common/serializer'
import { StreamableFile } from '@nestjs/common/file-stream'

/**
 * 全局响应拦截器
 */
export class AppIntercepter extends ClassSerializerInterceptor {
	serialize(response: PlainLiteralObject | Array<PlainLiteralObject>, options: ClassTransformOptions): PlainLiteralObject | PlainLiteralObject[] {
		let data: any

		// 如果不是对象,不是数组, 不是流 则直接返回
		if ((!isObject(response) && !isArray(response)) || response instanceof StreamableFile) {
			data = response
		}

		// 如果是数组,则遍历对每一项进行序列化
		else if (isArray(response)) {
			data = (response as PlainLiteralObject[]).map((item) => (!isObject(item) ? item : this.transformToPlain(item, options)))
		}
		// 如果是分页数据,则对items中的每一项进行序列化
		else if ('count' in response && 'items' in response) {
			const items = !isNil(response.items) && isArray(response.items) ? response.items : []
			data = {
				...response,
				items: (items as PlainLiteralObject[]).map((item) => {
					return !isObject(item) ? item : this.transformToPlain(item, options)
				}),
			}
		} else {
			// 如果响应是个对象则直接序列化
			data = this.transformToPlain(response, options)
		}
		return data
	}
}
