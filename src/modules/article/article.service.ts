import { Injectable, ConflictException, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CategoryDto } from './article.dto'
import { Article } from '@/typeorm/Article'

@Injectable()
export class CategoryService {
	constructor(@InjectRepository(Article) private ArticleRepository: Repository<Article>) {}

	async create(params: CategoryDto) {
		const { title } = params
		const tag = await this.ArticleRepository.findOneBy({ title })
		if (tag) throw new ConflictException('标签已存在')
		const newTag = await this.ArticleRepository.create(params)
		return await this.ArticleRepository.save(newTag)
	}

	async delete(id: number) {
		const tag = await this.ArticleRepository.findOneBy({ id })
		if (!tag) throw new NotFoundException('标签未找到')
		this.ArticleRepository.delete({ id: tag.id })
		return tag
	}

	async modify(id: number, params: CategoryDto) {
		const tag = await this.ArticleRepository.findOneBy({ id })
		if (!tag) throw new NotFoundException('标签未找到')
		this.ArticleRepository.update({ id }, { ...params })
	}

	private async aggregate() {}
}
