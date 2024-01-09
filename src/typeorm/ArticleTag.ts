import { Entity, PrimaryColumn } from 'typeorm'

@Entity({name: 'article_tag_relate'})
export class ArticleTagRelate {

	@PrimaryColumn({ comment: '文章id' })
	article_id!: number

	@PrimaryColumn({ comment: '标签id' })
	tag_id!: number
}
