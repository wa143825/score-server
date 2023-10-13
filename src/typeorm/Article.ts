import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne } from 'typeorm'
import { BaseEntity } from './Base'
import { ArticleCategory } from './Category'
import { ArticleTag } from './Tag'

@Entity({ name: 'article' })
export class Article extends BaseEntity {
	@Column({ comment: '文章标题' })
	title!: string

	@Column({ comment: '文章描述', nullable: true })
	description?: string

	@Column({ comment: '文章内容', type: 'longtext' })
	content!: string

	@Column({ comment: '封面', nullable: true })
	cover?: string

	@Column({ comment: '点赞', type: 'int', default: 0 })
	thumb?: string

	@Column({ comment: '文章排序', default: 0 })
	index?: number

	@Column({ comment: '是否公开', type: 'boolean', default: true })
	public?: boolean

	@ManyToOne(() => ArticleCategory, category => category.articles)
	@JoinColumn({name: 'categoryId'})
	category: ArticleCategory

	@ManyToMany(() => ArticleTag)
	@JoinTable()
	tags: ArticleTag
}
