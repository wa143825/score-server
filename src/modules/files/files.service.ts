import { Injectable, ConflictException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { File } from '@/typeorm/File'
import * as fs from 'fs'

@Injectable()
export class FilesService {
	constructor(
		@InjectRepository(File) private FileRepository: Repository<File>,
	){}

	async findOne(id: number) {

	}

	async getFile(path: string) {
		return fs.createReadStream(path)
	}

	async upload(file) {
		const { filename, path, size, minetype } = file
	// 	fieldname: 'file',
  // originalname: '我又改回去了.jpeg',
  // encoding: '7bit',
  // mimetype: 'image/jpeg',
  // destination: 'static',
  // filename: '我又改回去了.jpeg',
  // path: 'static/我又改回去了.jpeg',
  // size: 40874
		const f = await this.FileRepository.findOneBy({ name: filename })
		if (f) throw new ConflictException('文件已存在')
		const newTag = await this.FileRepository.create({
			name: filename,
			path,
			size,
			type: minetype,
			uploadUser: ''
		})
		return await this.FileRepository.save(newTag)
	}

	async delete(id: number) {
		await this.findOne(id)

		const res = await this.FileRepository.delete({ id })
		if(res.affected) {
			return true
		}
	}
}
