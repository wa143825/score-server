import { Body, Controller, Delete, Get, Post, Put, Param, Query, HttpCode, ParseIntPipe, Inject } from '@nestjs/common'
import { Msg } from '@/decorator/responser.decorator'
import { CreateTagDto, UpdateTagDto } from './tag.dto'
import { TagService } from './tag.service'
import { PaginateDto } from '@/utils/dto'

import { LoggerService } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

@Controller('tag')
export class TagController {
	constructor(
		private tagService: TagService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: LoggerService
	) {}

	@Get()
	findAll(@Query() query: PaginateDto) {
		return this.tagService.findAll(query)
	}

	@Get(':id')
	findOne(@Param('id', ParseIntPipe) id: number) {
		this.logger.warn('123')
		return this.tagService.findOne(id)
	}

	@Get('ids')
	findByIds(@Query() query: {ids: number[]}) {
		return this.tagService.findByIds(query.ids)
	}

	@Post()
	@HttpCode(200)
	create(@Body() data: CreateTagDto) {
		return this.tagService.create(data)
	}

	@Delete(':id')
	@Msg('删除成功')
	delete(@Param('id', ParseIntPipe) id: number) {
		return this.tagService.delete(id)
	}

	@Put()
	@Msg('修改成功')
	modify(@Body() data: UpdateTagDto) {
		return this.tagService.modify(data)
	}
}
