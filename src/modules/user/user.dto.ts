import { IsIn, IsOptional } from 'class-validator'

enum EGander {
	MALE = 'MALE',
	FEMALE = 'FEMALE',
	UNKNOWN = 'UNKNOWN',
}

export class CreateUserDto {
	username: string
	password: string
}

export class UpdateUserDto {
	username: string
	password: string
}

export class CreateUserProfileDto {
	firstName: string
	lastName: string
	age: number
	dob: string
}

export class CreateUserPostDto {
	title: string
	description: string
}
