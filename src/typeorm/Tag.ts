import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity({ name: 'article_tag' })
export class ArticleTag {
	@PrimaryGeneratedColumn('uuid')
	id!: number

	@Column({ unique: true })
	name: string

	@Column({ nullable: true })
	description: string

	@Column({ default: 0 })
	articlesCount: number

	@CreateDateColumn({ comment: '创建时间' })
	createAt!: Date

	@UpdateDateColumn({ comment: '更新时间' })
	updatedAt!: Date
}
