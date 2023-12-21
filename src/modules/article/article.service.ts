import { Injectable, ConflictException, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, In} from 'typeorm'
import { CreateArticleDto, FindDto, UpdateArticleDto } from './article.dto'
import { Article } from '@/typeorm/Article'
import { ArticleCategory } from '@/typeorm/Category'

import { pagination } from '@/utils/database'
import { PaginateDto } from '@/utils/dto'

import { TagService } from '../tag/tag.service'
import { CategoryService } from '../category/category.service'

import * as _ from 'lodash'

@Injectable()
export class ArticleService {
	constructor(
		@InjectRepository(Article) private ArticleRepository: Repository<Article>,
		@InjectRepository(ArticleCategory) private CateRepository: Repository<ArticleCategory>,

		private readonly tagService: TagService,
		private readonly CateService: CategoryService
	) {}

	async findAll(query: PaginateDto & FindDto) {
		let ids: number[] | null = null
		if (query.tagIds) {
			ids = query.tagIds instanceof Array ? query.tagIds : [query.tagIds]
		}
		return await pagination(this.ArticleRepository, query, {
			where: {
				category: {
					id: query.categoryId || null
				},
				tags: {
					id: ids ? In(ids) : null
				}
			},
			order: {
				updatedAt: -1
			}
		})
	}

	async findOne(id: number) {
		const data = await this.ArticleRepository.findOneBy({ id })
		if (!data) throw new NotFoundException('文章未找到')
		return data
	}

	async create(params: CreateArticleDto) {
		const { categoryId, title, tagIds } = params
		const cateData = await this.CateService.findOne(categoryId)
		let existTags
		if(!_.isEmpty(tagIds)) {
			existTags = await this.tagService.findByIds(tagIds)
		}

		const data = await this.ArticleRepository.findOneBy({ title })
		if (data) throw new ConflictException('标题已存在')
		const newData = await this.ArticleRepository.create(params)
		newData.category = cateData
		newData.tags = existTags
		return await this.ArticleRepository.save(newData)
	}

	async delete(id: number) {
		const data = await this.findOne(id)
		await this.ArticleRepository.delete({ id: data.id })
		return true
	}

	async modify(params: UpdateArticleDto) {
		const {id, ...p} = params
		await this.findOne(id)

		const res = await this.ArticleRepository.update({ id }, p)
		if(res.affected) {
			return true
		}
	}
}
