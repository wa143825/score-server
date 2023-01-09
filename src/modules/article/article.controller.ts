import { Body, Controller, Delete, Get, Post, Put, Param } from '@nestjs/common'
import { CategoryDto } from './article.dto'
import { CategoryService } from './article.service'
@Controller('category')
export class CategoryController {
	constructor(private categoryService: CategoryService) {}

	@Get()
	getTags() {}

	@Post()
	create(@Body() data: CategoryDto) {
		return this.categoryService.create(data)
	}

	@Delete(':id')
	delete(@Param('id') id: number) {
		return this.categoryService.delete(id)
	}

	@Put()
	modify() {}
}
