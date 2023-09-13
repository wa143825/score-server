import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Timestamp } from 'typeorm'

export abstract class BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	id!: string

	@CreateDateColumn({ comment: '创建时间' })
	createAt!: Timestamp

	@UpdateDateColumn({ comment: '更新时间' })
	updatedAt!: Timestamp
}
