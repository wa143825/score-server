/*
 * @LastEditors: 李博文
 * @LastEditTime: 2023-12-07 13:54:18
 * @Description: 文件管理页面
 */

import { Module } from '@nestjs/common'
import { FilesService } from './files.service'
import { FilesController } from "./files.controller";

@Module({
	imports: [],
	controllers: [FilesController],
	providers: [FilesService],
	exports: []
})
export class FilesModule {}
