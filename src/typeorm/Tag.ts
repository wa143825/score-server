import { Column, Entity, ManyToMany } from 'typeorm'
import { BaseEntity } from '@/typeorm/Base'
import { Article } from './Article'

@Entity({ name: 'article_tag' })
export class ArticleTag extends BaseEntity {
	@Column({ unique: true })
	name: string

	@Column({ nullable: true })
	description: string

	@ManyToMany(type => Article, article => article.tags)
	articles: Article[]
}
