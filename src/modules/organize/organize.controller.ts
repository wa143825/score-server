import { Body, Controller, Delete, Get, Post, Put, Param, Query, HttpCode, ParseIntPipe } from '@nestjs/common'
import { Msg } from '@/decorator/responser.decorator'
import { CreateOrganizeDto, UpdateOrganizeDto } from './organize.dto'
import { OrganizeService } from './organize.service'
@Controller('organize')
export class OrganizeController {
	constructor(private orgService: OrganizeService) {}

	@Get()
	findAll() {
		return this.orgService.findAll()
	}

	@Get(':id')
	findOne(@Param('id', ParseIntPipe) id: number) {
		return this.orgService.findOne(id)
	}

	@Post()
	@HttpCode(200)
	create(@Body() data: CreateOrganizeDto) {
		return this.orgService.create(data)
	}

	@Delete(':id')
	@Msg('删除成功')
	delete(@Param('id', ParseIntPipe) id: number) {
		return this.orgService.delete(id)
	}

	@Put()
	@Msg('修改成功')
	modify(@Body() data: UpdateOrganizeDto) {
		return this.orgService.modify(data)
	}
}
