import { Body, Controller, Delete, Get, Post, Put, Param, Query, HttpCode } from '@nestjs/common'
import { Msg } from '@/decorator/responser.decorator'
import { CreateTagDto, UpdateTagDto } from './tag.dto'
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
	@HttpCode(200)
	create(@Body() data: CreateTagDto) {
		return this.tagService.create(data)
	}

	@Delete(':id')
	@Msg('删除成功')
	delete(@Param('id') id: string) {
		return this.tagService.delete(id)
	}

	@Put()
	@Msg('修改成功')
	modify(@Body() data: UpdateTagDto) {
		console.log(data);
		return this.tagService.modify(data)
	}
}
