import { Injectable, ConflictException, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateCateDto, UpdateCateDto } from './category.dto'
import { ArticleCategory } from '@/typeorm/Category'

import { PaginateDto } from '@/utils/dto'
import { pagination } from '@/utils/database'

@Injectable()
export class CategoryService {
	constructor(
		@InjectRepository(ArticleCategory) private CateRepository: Repository<ArticleCategory>,
	) {}

	async findOne(id: number) {
		const data = await this.CateRepository.findOneBy({ id })
		if (!data) throw new NotFoundException('分类未找到')
		return data
	}

	async findAll(query: PaginateDto) {
		return await pagination(this.CateRepository, query)
	}

	async create(params: CreateCateDto) {
		const { name } = params
		const data = await this.CateRepository.findOneBy({ name })
		if (data) throw new ConflictException('分类已存在')
		const newData = await this.CateRepository.create(params)
		return await this.CateRepository.save(newData)
	}

	async delete(id: number) {
		await this.findOne(id)

		const res = await this.CateRepository.delete({ id })
		if(res.affected) {
			return true
		}
	}

	async modify(params: UpdateCateDto) {
		const {id, ...p} = params
		await this.findOne(id)

		const res = await this.CateRepository.update({ id }, p)
		if(res.affected) {
			return true
		}
	}
}
