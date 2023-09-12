import { Body, Controller, Delete, Get, Post, Put, Param, Query, HttpCode } from '@nestjs/common'
import { Msg } from '@/decorator/responser.decorator'
import { CreateCateDto, UpdateCateDto } from './category.dto'
import { CategoryService } from './category.service'
import { PaginateDto } from '@/utils/dto'
@Controller('category')
export class CategoryController {
	constructor(private cateService: CategoryService) {}

	@Get()
	getTags(@Query() query: PaginateDto) {
		return this.cateService.get(query)
	}

	@Get(':id')
	getTag(@Param('id') id: string) {
		return this.cateService.getOne(id)
	}

	@Post()
	@HttpCode(200)
	create(@Body() data: CreateCateDto) {
		return this.cateService.create(data)
	}

	@Delete(':id')
	@Msg('删除成功')
	delete(@Param('id') id: string) {
		return this.cateService.delete(id)
	}

	@Put()
	@Msg('修改成功')
	modify(@Body() data: UpdateCateDto) {
		return this.cateService.modify(data)
	}
}
