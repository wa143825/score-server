import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm'
import { Profile } from './Profile'
import { Session } from './Session'
import { BaseEntity } from './Base'
import { Exclude, Expose } from 'class-transformer'

@Exclude()
@Entity({ name: 'users' })
export class User extends BaseEntity {
	@Expose()
	@Column({ comment: '用户手机号' })
	phone!: string

	@Column({ comment: '用户密码' })
	password!: string

	@Column({ nullable: true })
	authStrategy: string

	@Expose()
	@OneToOne(() => Profile, (profile) => profile.user)
	@JoinColumn()
	profile: Profile

	@OneToMany(() => Session, (session) => session.user)
	sessions: Session[]
}
