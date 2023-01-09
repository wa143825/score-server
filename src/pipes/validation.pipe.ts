import { Injectable, PipeTransform, ArgumentMetadata, BadRequestException } from '@nestjs/common'
import { validate } from 'class-validator'
import { plainToInstance } from 'class-transformer'

@Injectable()
export class ValidatoionPipe implements PipeTransform {
	async transform(value: any, { metatype }: ArgumentMetadata) {
		if (!metatype || !this.toValidata(metatype)) return value
		const object = plainToInstance(metatype, value)
		const error = await validate(object)
		if (error.length > 0) {
			const msg = Object.values(error[0].constraints)[0]
			throw new BadRequestException(msg)
		}
		return value
	}

	private toValidata(metaType: any) {
		const types: any[] = [String, Boolean, Number, Array, Object]
		return !types.includes(metaType)
	}
}
