import { Column, Entity, PrimaryGeneratedColumn, OneToOne } from 'typeorm'
import { Exclude, Expose } from 'class-transformer'
import { User } from './User'

enum EGender {
	MALE,
	FEMALE,
	UNKNOWN,
}

@Exclude()
@Entity({ name: 'user_profile' })
export class Profile {
	@PrimaryGeneratedColumn('uuid')
	id!: string

	@Expose()
	@Column({ comment: '用户昵称' })
	nickname: string

	@Expose()
	@Column({ comment: '用户年龄', nullable: true })
	age?: number

	@Expose()
	@Column({ comment: '用户性别', default: EGender.UNKNOWN })
	gender: EGender

	@OneToOne(() => User, (user) => user.profile)
	user: User
}
