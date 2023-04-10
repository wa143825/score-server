import { Injectable, ConflictException, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { TagDto } from './tag.dto'
import { ArticleTag } from '@/typeorm/Tag'
import { PaginateDto } from '@/utils/dto'

@Injectable()
export class TagService {
	constructor(@InjectRepository(ArticleTag) private TagRepository: Repository<ArticleTag>) {}

	async create(params: TagDto) {
		const { name } = params
		const tag = await this.TagRepository.findOneBy({ name })
		if (tag) throw new ConflictException('标签已存在')
		const newTag = await this.TagRepository.create(params)
		return await this.TagRepository.save(newTag)
	}

	async delete(id: string) {
		const tag = await this.TagRepository.findOneBy({ id })
		if (!tag) throw new NotFoundException('标签未找到')
		this.TagRepository.delete({ id: tag.id })
		return tag
	}

	async modify(id: string, params: TagDto) {
		const tag = await this.TagRepository.findOneBy({ id })
		if (!tag) throw new NotFoundException('标签未找到')
		this.TagRepository.update({ id }, { ...params })
	}

	async get(query: PaginateDto) {
		const { pageNum, pageSize } = query
		const tags = await this.TagRepository.find({ take: pageSize, skip: (pageNum - 1) * pageSize })
		return tags
	}

	private async aggregate() {}
}
