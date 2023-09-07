import { IsString, IsNotEmpty, IsBoolean } from 'class-validator'

export class ArticleDto {
	@IsString()
	@IsNotEmpty({ message: '标题不能为空' })
	title: string

	@IsString()
	description?: string

	@IsString()
	cover?: string

	@IsNotEmpty({ message: '正文不能为空' })
	content: string

	@IsBoolean({ message: '是否发布' })
	public?: boolean
}
