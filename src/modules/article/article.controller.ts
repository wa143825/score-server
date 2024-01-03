import { Body, Controller, Query, Delete, Get, Post, Param, Put, HttpCode } from '@nestjs/common'
import { CreateArticleDto, UpdateArticleDto, FindDto } from './article.dto'
import { ArticleService } from './article.service'
import { PaginateDto } from '@/utils/dto'
import { Msg } from '@/decorator/responser.decorator'

@Controller('article')
export class ArticleController {
	constructor(private articleService: ArticleService) {}

	@Get()
	findAll(@Query() query: PaginateDto & FindDto) {
		return this.articleService.findAll(query)
	}

	@Get(':id')
	findOne(@Param('id') id: number) {
		return this.articleService.findOne(id)
	}

	@Post()
	@HttpCode(200)
	create(@Body() data: CreateArticleDto) {
		return this.articleService.create(data)
	}

	@Delete(':id')
	@Msg('删除成功')
	delete(@Param('id') id: number) {
		return this.articleService.delete(id)
	}

	@Put()
	@Msg('修改成功')
	modify(@Body() data: UpdateArticleDto) {
		return this.articleService.modify(data)
	}
}
