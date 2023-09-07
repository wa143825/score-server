import { Body, Controller, Delete, Get, Post, Put, Param, Query } from '@nestjs/common'
import { Msg } from '@/decorator/responser.decorator'
import { CategoryDto } from './category.dto'
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
	create(@Body() data: CategoryDto) {
		return this.cateService.create(data)
	}

	@Delete(':id')
	@Msg('删除成功')
	delete(@Param('id') id: string) {
		return this.cateService.delete(id)
	}

	@Put(':id')
	@Msg('修改成功')
	modify(@Param('id') id: string, @Body() data: CategoryDto) {
		return this.cateService.modify(id, data)
	}
}
