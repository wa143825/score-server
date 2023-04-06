import { Column, Entity } from 'typeorm'
import { BaseEntity } from './Base'

@Entity({ name: 'article_category' })
export class ArticleCategory extends BaseEntity {
	@Column({ comment: '分类名称' })
	name!: string

	@Column({ comment: '分类描述' })
	description?: string
}
