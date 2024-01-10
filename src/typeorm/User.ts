import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Profile } from './Profile'
import { Session } from './Session'
import { Exclude, Expose } from 'class-transformer'

@Exclude()
@Entity({ name: 'users' })
export class User {
	@Expose()
	@PrimaryGeneratedColumn({
		type: 'int'
	})
	id: number = null

	@Expose()
	@Column({ comment: '用户手机号' })
	phone!: string

	@Expose()
	@Column({ comment: '用户昵称' })
	nickname: string

	@Column({ comment: '用户密码' })
	password!: string

	@Expose()
	@OneToOne(() => Profile, (profile) => profile.user)
	@JoinColumn()
	profile: Profile

	@OneToMany(() => Session, (session) => session.user)
	sessions: Session[]
}
