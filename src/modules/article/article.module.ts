import { Module } from '@nestjs/common'
import { ArticleController } from './article.controller'
import { ArticleService } from './article.service'
import { CategoryService } from '../category/category.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Article } from '@/typeorm/Article'
import { ArticleCategory } from '@/typeorm/Category'

@Module({
	imports: [TypeOrmModule.forFeature([Article, ArticleCategory])],
	controllers: [ArticleController],
	providers: [ArticleService, CategoryService],
})
export class ArticleModule {}
