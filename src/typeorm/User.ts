import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm'
import { Profile } from './Profile'
import { Session } from './Session'
import { BaseEntity } from './Base'

@Entity({ name: 'users' })
export class User extends BaseEntity {
	@Column({ comment: '用户手机号' })
	phone!: string

	@Column({ comment: '用户密码' })
	password!: string

	@Column({ nullable: true })
	authStrategy: string

	@OneToOne(() => Profile)
	@JoinColumn()
	profile: Profile

	@OneToMany(() => Session, (session) => session.user)
	sessions: Session[]
}
