import { Injectable, ConflictException, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CategoryDto } from './category.dto'
import { ArticleCategory } from '@/typeorm/Category'

@Injectable()
export class CategoryService {
	constructor(@InjectRepository(ArticleCategory) private CategoryRepository: Repository<ArticleCategory>) {}

	async create(params: CategoryDto) {
		const { name } = params
		const tag = await this.CategoryRepository.findOneBy({ name })
		if (tag) throw new ConflictException('标签已存在')
		const newTag = await this.CategoryRepository.create(params)
		return await this.CategoryRepository.save(newTag)
	}

	async delete(id: number) {
		const tag = await this.CategoryRepository.findOneBy({ id })
		if (!tag) throw new NotFoundException('标签未找到')
		this.CategoryRepository.delete({ id: tag.id })
		return tag
	}

	async modify(id: number, params: CategoryDto) {
		const tag = await this.CategoryRepository.findOneBy({ id })
		if (!tag) throw new NotFoundException('标签未找到')
		this.CategoryRepository.update({ id }, { ...params })
	}

	private async aggregate() {}
}
