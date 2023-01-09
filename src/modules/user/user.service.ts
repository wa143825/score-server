import { Profile } from '@/typeorm/Profile'
import { User } from '@/typeorm/User'
import { CreateUserParams, UpdateUserParams, CreateUserfileParams, CreateUserPostParams } from '@/utils/types'
import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(User) private userRepository: Repository<User>,
		@InjectRepository(Profile) private profileRepository: Repository<Profile>,
	) {}

	async findUsers() {
		return this.userRepository.find({ relations: ['profile'] })
	}

	async createuser(userDetails: CreateUserParams) {
		const newUser = this.userRepository.create({ ...userDetails })
		return this.userRepository.save(newUser)
	}

	async updateUser(id: number, updateUserDetail: UpdateUserParams) {
		return this.userRepository.update({ id }, { ...updateUserDetail })
	}

	async deleteUser(id: number) {
		return this.userRepository.delete({ id })
	}

	async createUserProfile(id: number, createUserProfileDetails: CreateUserfileParams) {
		const user = await this.userRepository.findOneBy({ id })
		if (!user) throw new HttpException('User not found, Cannot create Profile', HttpStatus.BAD_REQUEST)

		const newProfile = this.profileRepository.create(createUserProfileDetails)
		const savedProfile = await this.profileRepository.save(newProfile)
		user.profile = savedProfile
		return this.userRepository.save(user)
	}

	async createUserPost(id: number, createUserPostDetails: CreateUserPostParams) {
		const user = await this.userRepository.findOneBy({ id })
		if (!user) throw new HttpException('User not found, Cannot create Profile', HttpStatus.BAD_REQUEST)

		// const nwePost = this.postRepository.create({
		// 	...createUserPostDetails,
		// 	user,
		// })
		// return this.postRepository.save(nwePost)
	}
}
