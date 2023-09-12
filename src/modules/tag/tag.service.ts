import { Injectable, ConflictException, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateTagDto, UpdateTagDto } from './tag.dto'
import { ArticleTag } from '@/typeorm/Tag'

import { PaginateDto } from '@/utils/dto'
import { pagination } from '@/utils/database'

@Injectable()
export class TagService {
	constructor(@InjectRepository(ArticleTag) private TagRepository: Repository<ArticleTag>) {}

	async findOne(id: string) {
		const data = await this.TagRepository.findOneBy({ id })
		if (!data) throw new NotFoundException('标签未找到')
		return data
	}

	async findAll(query: PaginateDto) {
		return await pagination(this.TagRepository, query)
	}

	async create(params: CreateTagDto) {
		const { name } = params
		const tag = await this.TagRepository.findOneBy({ name })
		if (tag) throw new ConflictException('标签已存在')
		const newTag = await this.TagRepository.create(params)
		return await this.TagRepository.save(newTag)
	}

	async delete(id: string) {
		await this.findOne(id)

		const res = await this.TagRepository.delete({ id })
		if(res.affected) {
			return true
		}
	}

	async modify(params: UpdateTagDto) {
		const {id, ...p} = params
		await this.findOne(id)

		const res = await this.TagRepository.update({ id }, p)
		if(res.affected) {
			return true
		}
	}

	private async aggregate() {}
}
