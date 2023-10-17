import { Body, Controller, Delete, Get, Post, Put, Param, Query, HttpCode } from '@nestjs/common'
import { Msg } from '@/decorator/responser.decorator'
import { CreateTagDto, UpdateTagDto } from './tag.dto'
import { TagService } from './tag.service'
import { PaginateDto } from '@/utils/dto'
@Controller('tag')
export class TagController {
	constructor(private tagService: TagService) {}

	@Get()
	findAll(@Query() query: PaginateDto) {
		console.log(query);

		return this.tagService.findAll(query)
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.tagService.findOne(id)
	}

	@Get('ids')
	findByIds(@Query() query: {ids: string[]}) {
		console.log(query.ids);
		return this.tagService.findByIds(query.ids)
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
		return this.tagService.modify(data)
	}
}
