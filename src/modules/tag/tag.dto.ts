import { IsString, IsNotEmpty, IsOptional } from 'class-validator'

class TagDto {
	@IsString({message: '标签名必须为字符串'})
	name: string

	@IsOptional()
	@IsString({message: '描述必须为字符串'})
	description: string
}

export class CreateTagDto extends TagDto {
	@IsNotEmpty({ message: '标签不能为空' })
	name: string
}

export class UpdateTagDto extends TagDto {
	@IsNotEmpty({message: 'id不能为空'})
	id: number

	@IsOptional()
	name: string
}
