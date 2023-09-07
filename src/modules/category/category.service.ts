import { Injectable, ConflictException, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CategoryDto } from './category.dto'
import { ArticleCategory } from '@/typeorm/Category'
import { Article } from '@/typeorm/Article'
import { PaginateDto } from '@/utils/dto'

@Injectable()
export class CategoryService {
	constructor(
		@InjectRepository(ArticleCategory) private CateRepository: Repository<ArticleCategory>,
		@InjectRepository(Article) private ArticleRepository: Repository<Article>,
	) {}

	async getOne(id: string) {
		return await this.CateRepository.findOneBy({ id })
	}

	async get({ pageNum = 1, pageSize = 10, sort = 1 }: PaginateDto) {
		const list = await this.CateRepository.find({
			take: pageSize,
			skip: (pageNum - 1) * pageSize,
			order: {
        updatedAt: sort === 1 ? "ASC" : 'DESC',
    	}
		})
		return list
	}

	async create(params: CategoryDto) {
		const { name } = params
		const data = await this.CateRepository.findOneBy({ name })
		if (data) throw new ConflictException('分类已存在')
		const newData = await this.CateRepository.create(params)
		return await this.CateRepository.save(newData)
	}

	async delete(id: string) {
		const data = await this.getOne(id)
		if (!data) throw new NotFoundException('标签未找到')
		const res = await this.CateRepository.delete({ id: data.id })
		if(res.affected) {
			return true
		}
	}

	async modify(id: string, params: CategoryDto) {
		const data = await this.getOne(id)
		if (!data) throw new NotFoundException('标签未找到')
		const res = await this.CateRepository.update({ id }, { ...params })
		if(res.affected) {
			return true
		}
	}

	private async aggregate() {}
}
