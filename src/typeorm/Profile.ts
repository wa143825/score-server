import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

enum IGender {
	MALE,
	FEMALE,
	UNKNOWN,
}

@Entity({ name: 'user_profile' })
export class Profile {
	@PrimaryGeneratedColumn('uuid')
	id!: number

	@Column({ comment: '用户昵称' })
	nickname: string

	@Column({ comment: '用户年龄' })
	age?: number

	@Column({ comment: '用户性别' })
	gender: IGender
}
