import { IsString, IsNotEmpty, IsBoolean, IsOptional, isString, IsArray, MinLength } from 'class-validator'

class ArticleDto {
	@IsString({message: '标题必须为字符串'})
	title: string

	@IsString()
	@IsOptional()
	description?: string

	@IsString()
	@IsOptional()
	cover?: string

	@IsString()
	content: string

	@IsBoolean({ message: '是否发布' })
	@IsOptional()
	public?: boolean
}

export class CreateArticleDto extends ArticleDto {
	@IsNotEmpty({ message: '标题不能为空' })
	@IsString({message: '分类ID必须为字符串'})
	categoryId: string

	@IsArray({message: '标签需要为数组'})
	@IsOptional()
	tagIds: string[]

	@IsNotEmpty({ message: '标题不能为空' })
	title: string

	@IsNotEmpty({ message: '正文不能为空' })
	content: string
}

export class UpdateArticleDto extends ArticleDto {
	@IsOptional()
	title: string

	@IsOptional()
	content: string
}

export class FindDto {
	@IsOptional()
	@IsString()
	categoryId: string

	@IsOptional()
	@IsArray()
	tagIds: string[]
}
