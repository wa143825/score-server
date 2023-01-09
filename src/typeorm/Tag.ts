import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'article_tag' })
export class ArticleTag {
	@PrimaryGeneratedColumn({ type: 'bigint' })
	id: number

	@Column({ unique: true })
	name: string

	@Column({ nullable: true })
	description: string

	@Column({ default: 0 })
	articlesCount: number

	@Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
	createAt: string

	@Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
	updatedAt: string
}
