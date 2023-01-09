import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { User } from './User'

@Entity({ name: 'article' })
export class Article {
	@PrimaryGeneratedColumn({ type: 'bigint' })
	id: number

	@Column({ unique: true })
	title: string

	@Column({ nullable: true })
	description: string

	@Column()
	content: string

	@Column({ type: 'int', default: '0' })
	thumb: string

	@Column({ type: 'boolean', default: true })
	public: boolean

	@Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
	createAt: string

	@Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
	updatedAt: string

	@ManyToOne(() => User, (user) => user.articles)
	user: User
}
