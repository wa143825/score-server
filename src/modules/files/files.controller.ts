import { Controller, Post, UploadedFile, Body, UseInterceptors, Get, Param, Delete } from "@nestjs/common";
import { FileInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { FilesService } from './files.service'

@Controller('files')
export class FilesController {
	constructor(private filesService: FilesService) {}

	@Post('upload')
	@UseInterceptors(FileInterceptor('file', {
		storage: diskStorage({
			destination: 'static',
			filename: (req, file, cb) => {
				return cb(null, file.originalname)
			}
		})
	}))
	upload(@UploadedFile() file, @Body() body ) {
		console.log('file', file);
		console.log('body', body);
		return this.filesService.upload(file, body)
	}

	@Get(':path')
	getFile(@Param('path') path: string ) {
		const fileStream = this.filesService.getFile('./uploads/' + path)
		return fileStream
	}

	@Delete(':id')
	delete(@Param('id') id: string) {
		this.filesService.delete(id)
	}
}
