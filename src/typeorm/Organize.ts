import { Column, Entity, Tree, TreeParent, TreeChildren} from 'typeorm'
import { BaseEntity } from '@/typeorm/Base'

@Entity({ name: 'organize' })
@Tree('adjacency-list')
export class Organize extends BaseEntity {
	@Column({ unique: true })
	name: string

	@TreeParent()
	parent: Organize;

	@TreeChildren()
	children: Organize[];
}
