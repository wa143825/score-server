import { Injectable } from '@nestjs/common'
import * as fs from 'fs'

@Injectable()
export class FilesService {
	constructor(){}

	async getFile(path: string) {
		return fs.createReadStream(path)
	}

	async upload(file, body) {
		console.log(file, body);
		return '文件上传成功'
	}

	async delete(id: string) {

	}
}
