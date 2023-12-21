import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Timestamp } from 'typeorm'
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
	@UpdateDateColumn({ comment: '更新时间' })
	updatedAt!: Date
}
