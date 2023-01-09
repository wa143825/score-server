import { Body, Controller, Delete, Get, Post, Put, Param } from '@nestjs/common'
import { CategoryDto } from './category.dto'
import { CategoryService } from './category.service'
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
