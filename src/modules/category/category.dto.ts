import { IsString, IsNotEmpty, IsEmpty } from 'class-validator'

export class CategoryDto {
	@IsString()
	@IsNotEmpty({ message: '标签不能为空' })
	name: string

	description: string
}
