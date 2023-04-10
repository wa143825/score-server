import { Column, Entity, ManyToOne } from 'typeorm'
import { User } from './User'
import { BaseEntity } from './Base'
@Entity({ name: 'user_session' })
export class Session extends BaseEntity {
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

	@ManyToOne(() => User, (user) => user.sessions)
	user: User
}
