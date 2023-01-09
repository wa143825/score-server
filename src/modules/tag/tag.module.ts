import { Module } from '@nestjs/common'
import { TagController } from './tag.controller'
import { TagService } from './tag.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ArticleTag } from '@/typeorm/Tag'

@Module({
	imports: [TypeOrmModule.forFeature([ArticleTag])],
	controllers: [TagController],
	providers: [TagService],
})
export class TagModule {}
