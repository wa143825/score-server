import { Body, Controller, Delete, Get, Post, Put, Param, Query } from '@nestjs/common'
import { TagDto } from './tag.dto'
import { TagService } from './tag.service'
import { PaginateDto } from '@/utils/dto'
@Controller('tag')
export class TagController {
	constructor(private tagService: TagService) {}

	@Get()
	getTags(@Query() query: PaginateDto) {
		return this.tagService.get(query)
	}

	@Post()
	create(@Body() data: TagDto) {
		return this.tagService.create(data)
	}

	@Delete(':id')
	delete(@Param('id') id: string) {
		return this.tagService.delete(id)
	}

	@Put()
	modify() {}
}
