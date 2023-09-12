import { Column, Entity, ManyToOne } from 'typeorm'
import { Exclude, Expose } from 'class-transformer'
import { BaseEntity } from './Base'
import { ArticleCategory } from './Category'

@Exclude()
@Entity({ name: 'article' })
export class Article extends BaseEntity {
	@Expose()
	@Column({ comment: '文章标题' })
	title!: string

	@Expose()
	@Column({ comment: '文章描述', nullable: true })
	description?: string

	@Expose()
	@Column({ comment: '文章内容', type: 'longtext' })
	content!: string

	@Expose()
	@Column({ comment: '点赞', type: 'int', default: 0 })
	thumb?: string

	@Column({ comment: '文章排序', default: 0 })
	customOrder?: number

	@Column({ comment: '是否公开', type: 'boolean', default: true })
	public?: boolean

	@ManyToOne(() => ArticleCategory, category => category.articles)
	category: ArticleCategory
}
