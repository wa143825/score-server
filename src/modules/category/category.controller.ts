import { Body, Controller, Delete, Get, Post, Put, Param, Query } from '@nestjs/common'
import { CategoryDto } from './category.dto'
import { CategoryService } from './category.service'

import { PaginateDto } from '@/utils/dto'

@Controller('category')
export class CategoryController {
	constructor(private categoryService: CategoryService) {}

	@Get()
	async get(@Query() query: PaginateDto) {
		return await this.categoryService.find(query)
	}

	@Get(':id')
	async getById(@Param('id') id: string) {
		return await this.categoryService.findById(id)
	}

	@Post()
	create(@Body() data: CategoryDto) {
		return this.categoryService.create(data)
	}

	@Delete(':id')
	delete(@Param('id') id: string) {
		return this.categoryService.delete(id)
	}

	@Put()
	modify() {}
}
