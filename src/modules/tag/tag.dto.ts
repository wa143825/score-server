import { IsString, IsNotEmpty, IsEmpty } from 'class-validator'

export class TagDto {
	@IsString()
	@IsNotEmpty({ message: '标签不能为空' })
	name: string

	description: string
}
