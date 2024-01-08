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

	async findOne(id: number) {
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
		const { parentId, name, creator } = params
		const data = await this.orgRepository.findOneBy({ name })
		if (data) throw new ConflictException('组织已存在')

		const newData = await this.orgRepository.create({
			name,
			creator,
		})
		if(parentId) {
			const parent = await this.orgRepository.findOneBy({id: parentId})
			newData.parent = parent
		}
		return await this.orgRepository.save(newData)
	}

	async delete(id: number) {
		await this.findOne(id)

		const res = await this.orgRepository.delete({ id })
		if(res.affected) {
			return true
		}
	}

	async modify(params: UpdateOrganizeDto) {
		const {id, parentId, ...rest} = params
		const data = await this.findOne(id)

		let res
		if (parentId === 0) {
			// 将父级指向根节点
			data.parent = null
			data.name = params.name || data.name
			res = await this.orgRepository.update(id, data)
		} else if (parentId) {
			// 修改父节点
			const parent = await this.orgRepository.findOneBy({id: parentId})
			data.parent = parent
			data.name = params.name || data.name
			res = await this.orgRepository.update(id , data)
		} else {
			// 不修改父节点
			data.name = params.name || data.name
			res = await this.orgRepository.update(id, data)
		}
		if(res.affected) {
			return true
		}
	}
}
