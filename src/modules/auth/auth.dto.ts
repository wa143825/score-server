import { IsString, IsNotEmpty, MinLength } from 'class-validator'

export class AuthDto {
	@IsString()
	@IsNotEmpty({ message: '手机号不能为空' })
	phone: string

	@IsString()
	@MinLength(6, { message: '密码不能小于6位' })
	password: string
}
