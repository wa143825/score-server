import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { Exclude, Expose } from 'class-transformer'

@Exclude()
export abstract class BaseEntity {
	@Expose()
	@PrimaryGeneratedColumn('uuid')
	id!: string

	@Expose()
	@CreateDateColumn({ comment: '创建时间' })
	createAt!: Date

	@Expose()
	@UpdateDateColumn({ comment: '更新时间' })
	updatedAt!: Date
}
