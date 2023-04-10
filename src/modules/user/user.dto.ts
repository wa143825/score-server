import { IsNotEmpty, IsOptional } from 'class-validator'

enum EGender {
	MALE,
	FEMALE,
	UNKNOWN,
}

export class CreateUserDto {
	@IsNotEmpty({ message: '用户名不能为空' })
	username: string
	@IsNotEmpty({ message: '密码不能为空' })
	password: string
}

export class UpdateUserDto {
	username: string
	password: string
}

export class CreateUserProfileDto {
	@IsNotEmpty({ message: '昵称不能为空' })
	nickname: string

	@IsOptional()
	age: number

	@IsOptional()
	gender: EGender
}

export class CreateUserPostDto {
	title: string
	description: string
}
