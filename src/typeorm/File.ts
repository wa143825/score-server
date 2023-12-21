import { Column, Entity } from 'typeorm'
import { BaseEntity } from '@/typeorm/Base'


@Entity({ name: 'file' })
export class File extends BaseEntity {
	@Column({ unique: true })
	name: string

	@Column()
	path: string

	@Column()
	size: number

	@Column()
	type: number

	@Column()
	uploadUser: string
}
