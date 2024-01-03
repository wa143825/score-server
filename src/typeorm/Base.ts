import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column } from 'typeorm'
import { Expose } from 'class-transformer'


export abstract class BaseEntity {
	@Expose()
	@PrimaryGeneratedColumn({
		type: 'int'
	})
	id: number = null

	@Expose()
	@CreateDateColumn({ comment: '创建时间' })
	createAt!: Date

	@Expose()
	@Column({ comment: '创建人' })
	creator: Number = null

	@Expose()
	@UpdateDateColumn({ comment: '修改时间' })
	modifyAt!: Date

	@Expose()
	@Column({ comment: '修改人', nullable: true })
	modifier: Number = null
}
