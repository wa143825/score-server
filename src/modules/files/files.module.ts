/*
 * @LastEditors: LBW
 * @LastEditTime: 2023-12-26 09:36:06
 * @Description: 文件管理页面
 */

import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { File } from '@/typeorm/File'
import { FilesService } from './files.service'
import { FilesController } from "./files.controller";

@Module({
	imports: [TypeOrmModule.forFeature([File])],
	controllers: [FilesController],
	providers: [FilesService],
	exports: []
})
export class FilesModule {}
