import { IsString, IsNotEmpty, IsOptional } from 'class-validator'

export class OrganizeDto {
	@IsString()
	@IsNotEmpty({message: '组织名称不能为空'})
	name: string

	@IsString()
	@IsOptional()
	parentId?: string
}

export class CreateOrganizeDto extends OrganizeDto {
}

export class UpdateOrganizeDto extends OrganizeDto {
	@IsNotEmpty({message: 'id不能为空'})
	id: string
}
