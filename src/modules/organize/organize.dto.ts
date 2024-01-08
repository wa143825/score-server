import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator'

export class OrganizeDto {
	@IsString()
	@IsNotEmpty({message: '组织名称不能为空'})
	name: string

	@IsNumber()
	@IsOptional()
	parentId?: number
}

export class CreateOrganizeDto extends OrganizeDto {
	creator: string
}

export class UpdateOrganizeDto extends OrganizeDto {
	@IsNotEmpty({message: 'id不能为空'})
	id: number

	modifier: number
}
