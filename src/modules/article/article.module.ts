import { Module } from '@nestjs/common'
import { ArticleController } from './article.controller'
import { ArticleService } from './article.service'

import { TypeOrmModule } from '@nestjs/typeorm'
import { Article } from '@/typeorm/Article'

import { CategoryModule } from '../category/category.module'
import { TagModule } from '../tag/tag.module'
import { ArticleCategory } from '@/typeorm/Category'
import { ArticleTag } from '@/typeorm/Tag'

@Module({
	imports: [
		TypeOrmModule.forFeature([Article, ArticleCategory, ArticleTag]),
		TagModule,
		CategoryModule
	],
	controllers: [ArticleController],
	providers: [ArticleService],
})
export class ArticleModule {}
