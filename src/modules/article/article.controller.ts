import { Body, Controller, Query, Delete, Get, Post, Param, Patch } from '@nestjs/common'
import { ArticleDto } from './article.dto'
import { ArticleService } from './article.service'
import { PaginateDto } from '@/utils/dto'
import { Msg } from '@/decorator/responser.decorator'

@Controller('article')
export class ArticleController {
	constructor(private articleService: ArticleService) {}

	@Get()
	@Msg('获取文章列表成功')
	findAll(@Query() query: PaginateDto) {
		return this.articleService.findAll(query)
	}

	@Get(':id')
	findOne(@Param('id') id: number) {
		return this.articleService.findOne(id)
	}

	@Post()
	create(@Body() data: ArticleDto) {
		return this.articleService.create(data)
	}

	@Patch(':id')
	update(@Param('id') id: number, @Body() data: ArticleDto) {
		return this.articleService.update(id, data)
	}

	@Delete(':id')
	delete(@Param('id') id: number) {
		return this.articleService.delete(id)
	}
}
