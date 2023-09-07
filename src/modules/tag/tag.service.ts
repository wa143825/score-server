import { Injectable, ConflictException, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { TagDto } from './tag.dto'
import { ArticleTag } from '@/typeorm/Tag'
import { PaginateDto } from '@/utils/dto'

@Injectable()
export class TagService {
	constructor(@InjectRepository(ArticleTag) private TagRepository: Repository<ArticleTag>) {}

	async getOne(id: string) {
		return await this.TagRepository.findOneBy({ id })
	}

	async get({ pageNum = 1, pageSize = 10, sort = 1 }: PaginateDto) {
		const list = await this.TagRepository.find({
			take: pageSize,
			skip: (pageNum - 1) * pageSize,
			order: {
        updatedAt: sort === 1 ? "ASC" : 'DESC',
    	}
		})
		return list
	}

	async create(params: TagDto) {
		const { name } = params
		const tag = await this.TagRepository.findOneBy({ name })
		if (tag) throw new ConflictException('标签已存在')
		const newTag = await this.TagRepository.create(params)
		return await this.TagRepository.save(newTag)
	}

	async delete(id: string) {
		const data = await this.getOne(id)
		if (!data) throw new NotFoundException('标签未找到')
		const res = await this.TagRepository.delete({ id: data.id })
		if(res.affected) {
			return true
		}
	}

	async modify(id: string, params: TagDto) {
		const data = await this.getOne(id)
		if (!data) throw new NotFoundException('标签未找到')
		const res = await this.TagRepository.update({ id }, { ...params })
		if(res.affected) {
			return true
		}
	}

	private async aggregate() {}
}
