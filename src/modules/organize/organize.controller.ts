import { Body, Controller, Delete, Get, Post, Put, Param, Query, HttpCode } from '@nestjs/common'
import { Msg } from '@/decorator/responser.decorator'
import { CreateOrganizeDto, UpdateOrganizeDto } from './organize.dto'
import { OrganizeService } from './organize.service'
import { PaginateDto } from '@/utils/dto'
@Controller('organize')
export class OrganizeController {
	constructor(private cateService: OrganizeService) {}

	@Get()
	findAll(@Query() query: PaginateDto) {
		return this.cateService.findAll(query)
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.cateService.findOne(id)
	}

	@Post()
	@HttpCode(200)
	create(@Body() data: CreateOrganizeDto) {
		return this.cateService.create(data)
	}

	@Delete(':id')
	@Msg('删除成功')
	delete(@Param('id') id: string) {
		return this.cateService.delete(id)
	}

	@Put()
	@Msg('修改成功')
	modify(@Body() data: UpdateOrganizeDto) {
		return this.cateService.modify(data)
	}
}
