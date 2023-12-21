import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator'

export class CateDto {
	@IsString()
	name: string

	@IsOptional()
	@IsString()
	description: string

	@IsOptional()
	@IsString()
	cover: string

	@IsOptional()
	@IsNumber()
	customOrder?: number
}

export class CreateCateDto extends CateDto {
	@IsNotEmpty({ message: '分类名称不能为空' })
	name: string
}

export class UpdateCateDto extends CateDto {
	@IsNotEmpty({message: 'id不能为空'})
	id: number

	@IsOptional()
	name: string
}
