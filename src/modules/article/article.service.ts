import { Injectable, ConflictException, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ArticleDto } from './article.dto'
import { Article } from '@/typeorm/Article'

import { pagination } from '@/utils/database'
import { PaginateDto } from '@/utils/dto'

@Injectable()
export class ArticleService {
	constructor(@InjectRepository(Article) private ArticleRepository: Repository<Article>) {}

	async create(params: ArticleDto) {
		const { title } = params
		const one = await this.ArticleRepository.findOneBy({ title })
		if (one) throw new ConflictException('标题已存在')
		const data = await this.ArticleRepository.create(params)
		return await this.ArticleRepository.save(data)
	}

	async findAll(query: PaginateDto) {
		return await pagination(this.ArticleRepository, query)
	}

	async findOne(id: string) {
		const data = await this.ArticleRepository.findOneBy({ id })
		if (!data) throw new NotFoundException('文章未找到')
		return data
	}

	async delete(id: string) {
		const tag = await this.ArticleRepository.findOneBy({ id })
		if (!tag) throw new NotFoundException('标签未找到')
		this.ArticleRepository.delete({ id })
		return tag
	}

	async update(id: string, params: ArticleDto) {
		const tag = await this.ArticleRepository.findOneBy({ id })
		if (!tag) throw new NotFoundException('标签未找到')
		this.ArticleRepository.update({ id }, { ...params })
	}
}
