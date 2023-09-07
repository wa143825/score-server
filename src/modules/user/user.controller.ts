import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common'
import { CreateUserDto, UpdateUserDto, CreateUserProfileDto, CreateUserPostDto } from './user.dto'
import { UserService } from './user.service'
import { PaginateDto } from '@/utils/dto'

@Controller('user')
export class UserController {
	constructor(private userService: UserService) {}

	@Get()
	async get(@Query() query: PaginateDto) {
		return await this.userService.findUsers(query)
	}

	@Get(':id')
	async getById(@Param('id') id: string) {
		return await this.userService.findUserById(id)
	}

	@Post()
	createUser(@Body() createUserDto: CreateUserDto) {
		this.userService.createuser(createUserDto)
	}

	@Put(':id')
	async updateUserById(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
		return await this.userService.updateUser(id, updateUserDto)
	}

	@Delete(':id')
	async deleteUserById(@Param('id') id: string) {
		await this.userService.deleteUser(id)
	}

	@Post(':id/profiles')
	async createUserProfile(@Param('id') id: string, @Body() createUserProfileDto: CreateUserProfileDto) {
		return this.userService.createUserProfile(id, createUserProfileDto)
	}
}
