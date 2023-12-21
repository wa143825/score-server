import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common'
import { CreateUserDto, UpdateUserDto, CreateUserProfileDto, CreateUserPostDto } from './user.dto'
import { UserService } from './user.service'
import { PaginateDto } from '@/utils/dto'

@Controller('user')
export class UserController {
	constructor(private userService: UserService) {}

	@Get()
	async get(@Query() query: PaginateDto) {
		return await this.userService.findAll(query)
	}

	@Get(':id')
	async getById(@Param('id', ParseIntPipe) id: number) {
		return await this.userService.findOne(id)
	}

	@Post()
	createUser(@Body() createUserDto: CreateUserDto) {
		this.userService.createuser(createUserDto)
	}

	@Put(':id')
	async updateUserById(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
		return await this.userService.updateUser(id, updateUserDto)
	}

	@Delete(':id')
	async deleteUserById(@Param('id', ParseIntPipe) id: number) {
		await this.userService.deleteUser(id)
	}

	@Post(':id/profiles')
	async createUserProfile(@Param('id', ParseIntPipe) id: number, @Body() createUserProfileDto: CreateUserProfileDto) {
		return this.userService.createUserProfile(id, createUserProfileDto)
	}
}
