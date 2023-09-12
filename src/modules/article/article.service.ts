import { Injectable, ConflictException, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateArticleDto, UpdateArticleDto } from './article.dto'
import { Article } from '@/typeorm/Article'
import { ArticleCategory } from '@/typeorm/Category'

import { pagination } from '@/utils/database'
import { PaginateDto } from '@/utils/dto'

@Injectable()
export class ArticleService {
	constructor(
		@InjectRepository(Article) private ArticleRepository: Repository<Article>,
		@InjectRepository(ArticleCategory) private CateRepository: Repository<ArticleCategory>
	) {}

	async findAll(query: PaginateDto) {
		return await pagination(this.ArticleRepository, query)
	}

	async findOne(id: string) {
		const data = await this.ArticleRepository.findOneBy({ id })
		if (!data) throw new NotFoundException('文章未找到')
		return data
	}

	async create(params: CreateArticleDto) {
		const { categoryId } = params
		const cateData = await this.CateRepository.findOneBy({id: categoryId})
		if(!cateData) throw new NotFoundException('分类未找到')

		const { title } = params
		const data = await this.ArticleRepository.findOneBy({ title })
		if (data) throw new ConflictException('标题已存在')
		const newData = await this.ArticleRepository.create(params)
		newData.category = cateData
		return await this.ArticleRepository.save(newData)
	}

	async delete(id: string) {
		const data = await this.findOne(id)
		await this.ArticleRepository.delete({ id: data.id })
		return true
	}

	async update(id: string, params: UpdateArticleDto) {
		const tag = await this.ArticleRepository.findOneBy({ id })
		if (!tag) throw new NotFoundException('标签未找到')
		this.ArticleRepository.update({ id }, { ...params })
	}
}
