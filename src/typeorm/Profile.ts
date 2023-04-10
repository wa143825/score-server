import { Column, Entity, PrimaryGeneratedColumn, OneToOne } from 'typeorm'
import { User } from './User'
import { Exclude, Expose } from 'class-transformer'

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
	@Column({ comment: '用户年龄' })
	age?: number

	@Expose()
	@Column({ comment: '用户性别' })
	gender: EGender

	@OneToOne(() => User, (user) => user.profile)
	user: User
}
