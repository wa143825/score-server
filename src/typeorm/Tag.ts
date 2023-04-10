import { Column, Entity } from 'typeorm'
import { BaseEntity } from '@/typeorm/Base'

@Entity({ name: 'article_tag' })
export class ArticleTag extends BaseEntity {
	@Column({ unique: true })
	name: string

	@Column({ nullable: true })
	description: string
}
