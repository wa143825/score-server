import { Injectable, ConflictException, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, In} from 'typeorm'
import { CreateArticleDto, FindDto, UpdateArticleDto } from './article.dto'
import { Article } from '@/typeorm/Article'
import { ArticleTagRelate } from '@/typeorm/ArticleTag'

import { pagination } from '@/utils/database'
import { PaginateDto } from '@/utils/dto'

import { TagService } from '../tag/tag.service'
import { CategoryService } from '../category/category.service'

import * as _ from 'lodash'

@Injectable()
export class ArticleService {
	constructor(
		@InjectRepository(Article) private ArticleRepository: Repository<Article>,
		@InjectRepository(ArticleTagRelate) private ArticleTagRelate: Repository<ArticleTagRelate>,

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
				categoryId: query.categoryId,
			},
			order: {
				modifyAt: -1
			}
		})
	}

	async findOne(id: number) {
		const data = await this.ArticleRepository.findOneBy({ id })
		if (!data) throw new NotFoundException('文章未找到')
		return data
	}

  // 新增和修改之前校验
	async beforeCheck (params: CreateArticleDto | UpdateArticleDto) {
		const { categoryId, title, tagIds } = params
		// 2、判断分类
		await this.CateService.findOne(categoryId)
		if(!_.isEmpty(tagIds)) {
			// 3、判断标签
			const tags = await this.tagService.findByIds(tagIds)
			if (tags.length !== tagIds.length) {
				throw new NotFoundException('部分标签不存在')
			}
		}
	}

	async create(params: CreateArticleDto) {
		await this.beforeCheck(params)
		const { tagIds, title } = params
		const data = await this.ArticleRepository.findOneBy({ title })
		if (data) throw new ConflictException('标题已存在')

		const newData = await this.ArticleRepository.create(params)
		const saveData = await this.ArticleRepository.save(newData)

		if (tagIds.length > 1) {
			this.ArticleRepository.createQueryBuilder()
				.insert()
				.into(ArticleTagRelate)
				.values(tagIds.map(i => ({ article_id: saveData.id, tag_id: i})))
				.execute()
		}

		return '保存成功'
	}

	async delete(id: number) {
		await this.findOne(id)
		await this.ArticleRepository.delete({ id })
		// 删除的时候同时删除关联的标签关系
		await this.ArticleTagRelate.delete({
			article_id: id
		})
		return true
	}

	async modify(params: UpdateArticleDto) {
		await this.beforeCheck(params)

		const { id } = params
		const data = await this.findOne(id)

		for (let key in data) {
			if (params[key] !== undefined) {
				data[key] = params[key]
			}
		}
    const { tagIds } = params
    if (tagIds.length > 1) {
      await this.ArticleTagRelate.delete({
        article_id: id
      })
			for (let i = 0; i < tagIds.length; i++) {
				const relateData = this.ArticleTagRelate.create({
					article_id: id,
					tag_id: tagIds[i]
				})
				await this.ArticleTagRelate.save(relateData)
			}
		}

		const res = await this.ArticleRepository.update(id, data)
		if(res.affected) {
			return true
		}
	}
}
