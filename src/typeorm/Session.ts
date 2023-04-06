import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { User } from './User'

@Entity({ name: 'user_session' })
export class Session {
	@PrimaryGeneratedColumn('uuid')
	id!: number

	@Column()
	ipAddress: string

	@Column()
	token: string

	@Column()
	userAgent: string

	@Column()
	browser: string

	@Column()
	operatingSystem: string

	@CreateDateColumn({ comment: '创建时间' })
	createAt!: Date

	@UpdateDateColumn({ comment: '更新时间' })
	updatedAt!: Date

	@ManyToOne(() => User, (user) => user.sessions)
	user: User
}
