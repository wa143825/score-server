import { IsString, IsNotEmpty, IsEmpty } from 'class-validator'

export class CategoryDto {
	@IsString()
	@IsNotEmpty({ message: '分类名称不能为空' })
	name: string

	@IsString()
	description: string

	customOrder?: number
}
