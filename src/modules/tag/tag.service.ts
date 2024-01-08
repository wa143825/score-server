import { Injectable, ConflictException, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, In } from 'typeorm'
import { CreateTagDto, UpdateTagDto } from './tag.dto'
import { ArticleTag } from '@/typeorm/Tag'

import { PaginateDto } from '@/utils/dto'
import { pagination } from '@/utils/database'

@Injectable()
export class TagService {
	constructor(@InjectRepository(ArticleTag) private TagRepository: Repository<ArticleTag>) {}

	async findOne(id: number) {
		const data = await this.TagRepository.findOneBy({id})

		if (!data) throw new NotFoundException('标签未找到')
		return data
	}

	async findAll(query: PaginateDto) {
		return await pagination(this.TagRepository, query)
	}

	async findByIds(ids: number[]) {
		return await this.TagRepository.findBy({id: In(ids)})
	}

	async create(params: CreateTagDto) {
		const { name } = params
		const data = await this.TagRepository.findOneBy({ name })
		if (data) throw new ConflictException('标签已存在')
		const newData = await this.TagRepository.create(params)
		return await this.TagRepository.save(newData)
	}

	async delete(id: number) {
		await this.findOne(id)

		const res = await this.TagRepository.delete({ id })
		if(res.affected) {
			return true
		}
	}

	async modify(params: UpdateTagDto) {
		const { id } = params
		const data = await this.findOne(id)
		for (let key in params) {
			if (params[key] !== undefined) {
				data[key] = params[key]
			}
		}
		const res = await this.TagRepository.update(id, data)
		if(res.affected) {
			return true
		}
	}
}
