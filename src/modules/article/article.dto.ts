import { IsString, IsNotEmpty, IsBoolean, IsOptional, IsArray, ArrayMaxSize, IsNumber } from 'class-validator'

class ArticleDto {
	@IsNotEmpty({ message: '分类不能为空' })
	@IsNumber()
	categoryId: number

	@IsOptional()
	@IsArray({message: '标签需要为数组'})
	@ArrayMaxSize(3, {message: '最多3个标签'})
	tagIds: number[]

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
	title: string

	@IsNotEmpty({ message: '正文不能为空' })
	content: string
}

export class UpdateArticleDto extends ArticleDto {
	@IsNotEmpty({message: 'id不能为空'})
	id: number

	@IsOptional()
	title: string

	@IsOptional()
	content: string
}

export class FindDto {
	@IsOptional()
	@IsString()
	categoryId: number

	@IsOptional()
	@IsArray()
	tagIds: number[]
}
