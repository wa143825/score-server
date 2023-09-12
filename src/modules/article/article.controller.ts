import { Body, Controller, Query, Delete, Get, Post, Param, Patch, HttpCode } from '@nestjs/common'
import { CreateArticleDto, UpdateArticleDto } from './article.dto'
import { ArticleService } from './article.service'
import { PaginateDto } from '@/utils/dto'
import { Msg } from '@/decorator/responser.decorator'

@Controller('article')
export class ArticleController {
	constructor(private articleService: ArticleService) {}

	@Get()
	findAll(@Query() query: PaginateDto) {
		return this.articleService.findAll(query)
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.articleService.findOne(id)
	}

	@Post()
	@HttpCode(200)
	create(@Body() data: CreateArticleDto) {
		return this.articleService.create(data)
	}

	@Patch(':id')
	@Msg('修改成功')
	update(@Param('id') id: string, @Body() data: UpdateArticleDto) {
		return this.articleService.update(id, data)
	}

	@Delete(':id')
	@Msg('删除成功')
	delete(@Param('id') id: string) {
		return this.articleService.delete(id)
	}
}
