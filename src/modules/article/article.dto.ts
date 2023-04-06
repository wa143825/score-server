import { IsString, IsNotEmpty } from 'class-validator'

export class ArticleDto {
	@IsString()
	@IsNotEmpty({ message: '标题不能为空' })
	title: string

	description: string

	cover: string

	@IsNotEmpty({ message: '正文不能为空' })
	content: string

	public: boolean
}
