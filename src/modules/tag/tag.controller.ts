import { Body, Controller, Delete, Get, Post, Put, Param, Query } from '@nestjs/common'
import { Msg } from '@/decorator/responser.decorator'
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

	@Get(':id')
	getTag(@Param('id') id: string) {
		return this.tagService.getOne(id)
	}

	@Post()
	create(@Body() data: TagDto) {
		return this.tagService.create(data)
	}

	@Delete(':id')
	@Msg('删除成功')
	delete(@Param('id') id: string) {
		return this.tagService.delete(id)
	}

	@Put(':id')
	@Msg('修改成功')
	modify(@Param('id') id: string, @Body() data: TagDto) {
		return this.tagService.modify(id, data)
	}
}
