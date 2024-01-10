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
	@PrimaryGeneratedColumn({
		type: 'int'
	})
	id: number

	@Expose()
	@Column({ comment: '年龄', nullable: true })
	age?: number

	@Expose()
	@Column({ comment: '头像', nullable: true })
	avatar?: string

	@Expose()
	@Column({ comment: '性别', default: EGender.UNKNOWN })
	gender: EGender

	@OneToOne(() => User, (user) => user.profile)
	user: User
}
