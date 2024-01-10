import { Injectable, ConflictException, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, In } from 'typeorm'
import { CreateTagDto, UpdateTagDto } from './tag.dto'
import { ArticleTag } from '@/typeorm/Tag'

import { PaginateDto } from '@/utils/dto'
import { pagination } from '@/utils/database'

@Injectable()
export class TagService {
	constructor(@InjectRepository(ArticleTag) private TagRepository: Repository<ArticleTag>) {}

	async findOne(id: number) {
		const data = await this.TagRepository.query(`
			SELECT article_tag.* , creator_user.nickname AS creator, modifier_user.nickname AS modifier
			FROM article_tag
			LEFT JOIN users AS creator_user ON article_tag.creator = creator_user.id
			LEFT JOIN users AS modifier_user ON article_tag.modifier = modifier_user.id
			WHERE article_tag.id = ${id}
			LIMIT 1
		`)

		if (!data) throw new NotFoundException('标签未找到')
		return data[0]
	}

	async findAll(query: PaginateDto) {
		return await pagination(this.TagRepository, query)
	}

	async findByIds(ids: number[]) {
		return await this.TagRepository.findBy({id: In(ids)})
	}

	async create(params: CreateTagDto) {
		const { name } = params
		const data = await this.TagRepository.findOneBy({ name })
		if (data) throw new ConflictException('标签已存在')
		const newData = await this.TagRepository.create(params)
		return await this.TagRepository.save(newData)
	}

	async delete(id: number) {
		await this.findOne(id)

		const res = await this.TagRepository.delete({ id })
		if(res.affected) {
			return true
		}
	}

	async modify(params: UpdateTagDto) {
		const { id } = params
		const data = await this.findOne(id)
		for (let key in params) {
			if (params[key] !== undefined) {
				data[key] = params[key]
			}
		}
		const res = await this.TagRepository.update(id, data)
		if(res.affected) {
			return true
		}
	}
}
