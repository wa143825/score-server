import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator'

export class OrganizeDto {
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

export class CreateOrganizeDto extends OrganizeDto {
	@IsNotEmpty({ message: '分类名称不能为空' })
	name: string
}

export class UpdateOrganizeDto extends OrganizeDto {
	@IsNotEmpty({message: 'id不能为空'})
	id: string

	@IsOptional()
	name: string
}
