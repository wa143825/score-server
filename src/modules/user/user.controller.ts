import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common'
import { CreateUserDto, UpdateUserDto, CreateUserProfileDto, CreateUserPostDto } from './user.dto'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
	constructor(private userService: UserService) {}

	@Get()
	async getUsers() {
		const users = await this.userService.findUsers()
		return users
	}

	@Post()
	createUser(@Body() createUserDto: CreateUserDto) {
		this.userService.createuser(createUserDto)
	}

	@Put(':id')
	async updateUserById(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
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

	@Post(':id/posts')
	createUserPost(@Param('id', ParseIntPipe) id: number, @Body() createUserPostDto: CreateUserPostDto) {
		return this.userService.createUserPost(id, createUserPostDto)
	}
}
