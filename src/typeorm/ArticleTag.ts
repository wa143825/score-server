import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity({name: 'article_tag_relate'})
export class Article_Tag {

	@PrimaryColumn()
	@Column({ comment: '文章id' })
	article_id!: number

	@PrimaryColumn()
	@Column({ comment: '标签id' })
	tag_id!: number
}
