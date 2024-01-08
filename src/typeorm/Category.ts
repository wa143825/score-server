import { Column, Entity } from 'typeorm'
import { BaseEntity } from './Base'

@Entity({ name: 'article_category' })
export class ArticleCategory extends BaseEntity {
	@Column({ comment: '分类名称', unique: true })
	name!: string

	@Column({ comment: '分类描述' })
	description?: string

	@Column({ comment: '排序排序', default: 0 })
	customOrder?: number
}
