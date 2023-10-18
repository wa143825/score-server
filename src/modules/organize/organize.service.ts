import { Injectable, ConflictException, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { IsNull, Repository } from 'typeorm'
import { CreateOrganizeDto, UpdateOrganizeDto } from './organize.dto'

import { Organize } from '@/typeorm/Organize'

@Injectable()
export class OrganizeService {
	constructor(
		@InjectRepository(Organize) private orgRepository: Repository<Organize>,
	) {}

	async findOne(id: string) {
		const data = await this.orgRepository.findOne({
			where: {id},
			relations: ['children']
		 })
		if (!data) throw new NotFoundException('组织未找到')
		return data
	}

	async findAll() {
		return await this.orgRepository.find({
			where: {parent: IsNull()},
			relations: ['children'],
		})
	}

	async create(params: CreateOrganizeDto) {
		const { name, parentId } = params
		const data = await this.orgRepository.findOneBy({ name })
		if (data) throw new ConflictException('组织已存在')

		let p = null
		if(parentId) {
			p = await this.orgRepository.findOneBy({id: parentId})
		}

		const newData = await this.orgRepository.create({
			name,
			parent: p
		})
		return await this.orgRepository.save(newData)
	}

	async delete(id: string) {
		await this.findOne(id)

		const res = await this.orgRepository.delete({ id })
		if(res.affected) {
			return true
		}
	}

	async modify(params: UpdateOrganizeDto) {
		const {id, parentId, ...rests} = params
		await this.findOne(id)

		let p = null
		if(parentId) {
			p = await this.orgRepository.findOneBy({id: parentId})
		}

		const res = await this.orgRepository.update({ id }, {
			parent: p,
			...rests
		})
		if(res.affected) {
			return true
		}
	}
}
