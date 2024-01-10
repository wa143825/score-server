import { PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate } from 'typeorm'
import { Expose } from 'class-transformer'
import dayjs from 'dayjs'

export abstract class BaseEntity {
	@Expose()
	@PrimaryGeneratedColumn({
		type: 'int'
	})
	id: number = null

	@Expose()
	@Column({ comment: '创建时间' })
	createAt: String

	@Expose()
	@Column({ comment: '创建人' })
	creator: Number

	@Expose()
	@Column({ comment: '修改时间', nullable: true })
	modifyAt: String

	@Expose()
	@Column({ comment: '修改人', nullable: true })
	modifier: Number

	@BeforeInsert()
	setCreateDate() {
		this.createAt = dayjs().format('YYYY/MM/DD HH:mm:ss')
	}

	@BeforeUpdate()
	setModifyDate() {
		console.log('modifyAt');
		this.modifyAt = dayjs().format('YYYY/MM/DD HH:mm:ss')
	}
}
