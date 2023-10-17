import { Injectable, ConflictException, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateOrganizeDto, UpdateOrganizeDto } from './organize.dto'

import { PaginateDto } from '@/utils/dto'
import { pagination } from '@/utils/database'
import { Organize } from '@/typeorm/Organize'

@Injectable()
export class OrganizeService {
	constructor(
		@InjectRepository(Organize) private CateRepository: Repository<Organize>,
	) {}

	async findOne(id: string) {
		const data = await this.CateRepository.findOneBy({ id })
		if (!data) throw new NotFoundException('分类未找到')
		return data
	}

	async findAll(query: PaginateDto) {
		return await pagination(this.CateRepository, query)
	}

	async create(params: CreateOrganizeDto) {
		const { name } = params
		const data = await this.CateRepository.findOneBy({ name })
		if (data) throw new ConflictException('分类已存在')
		const newData = await this.CateRepository.create(params)
		return await this.CateRepository.save(newData)
	}

	async delete(id: string) {
		await this.findOne(id)

		const res = await this.CateRepository.delete({ id })
		if(res.affected) {
			return true
		}
	}

	async modify(params: UpdateOrganizeDto) {
		const {id, ...p} = params
		await this.findOne(id)

		const res = await this.CateRepository.update({ id }, p)
		if(res.affected) {
			return true
		}
	}
}
