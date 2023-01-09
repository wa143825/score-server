import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { User } from './User'

@Entity({ name: 'user_session' })
export class Session {
	@PrimaryGeneratedColumn({ type: 'bigint' })
	id: number

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

	@Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
	createAt: string

	@Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
	updatedAt: string

	@ManyToOne(() => User, (user) => user.sessions)
	user: User
}
