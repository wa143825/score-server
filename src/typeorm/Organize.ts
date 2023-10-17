import { Column, Entity, ManyToOne, OneToMany} from 'typeorm'
import { BaseEntity } from '@/typeorm/Base'

@Entity({ name: 'organize' })
export class Organize extends BaseEntity {
	@Column({ unique: true })
	name: string

	@ManyToOne(type => Organize, category => category.children)
	parent: Organize;

	@OneToMany(type => Organize, category => category.parent)
	children: Organize[];
}
