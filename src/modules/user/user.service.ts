import { Profile } from '@/typeorm/Profile'
import { User } from '@/typeorm/User'
import { CreateUserProfileDto, UpdateUserDto, CreateUserDto } from './user.dto'
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { pagination } from '@/utils/database'
import { PaginateDto } from '@/utils/dto'

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(User) private userRepository: Repository<User>,
		@InjectRepository(Profile) private profileRepository: Repository<Profile>,
	) {}

	async findAll(query: PaginateDto) {
		return await pagination(this.userRepository, query, {relations: ['profile']})
	}

	async findOne(id: number) {
		const data = await this.userRepository
			.createQueryBuilder('user')
			.where({ id })
			.leftJoinAndSelect('user.profile', 'profile')
			.getOne()
		return data
	}

	async createuser(userDetails: CreateUserDto) {
		const newUser = this.userRepository.create({ ...userDetails })
		return this.userRepository.save(newUser)
	}

	async updateUser(id: number, updateUserDetail: UpdateUserDto) {
		return this.userRepository.update({ id }, { ...updateUserDetail })
	}

	async deleteUser(id: number) {
		return this.userRepository.delete({ id })
	}

	async createUserProfile(id: number, createUserProfileDetails: CreateUserProfileDto) {
		const user = await this.userRepository.findOneBy({ id })
		if (!user) throw new HttpException('User not found, Cannot create Profile', HttpStatus.BAD_REQUEST)

		const newProfile = this.profileRepository.create(createUserProfileDetails)
		const savedProfile = await this.profileRepository.save(newProfile)
		user.profile = savedProfile
		return this.userRepository.save(user)
	}
}
