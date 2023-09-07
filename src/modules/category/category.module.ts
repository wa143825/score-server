import { Module } from '@nestjs/common'
import { CategoryController } from './category.controller'
import { CategoryService } from './category.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ArticleCategory } from '@/typeorm/Category'
import { Article } from '@/typeorm/Article'

@Module({
	imports: [TypeOrmModule.forFeature([ArticleCategory, Article])],
	controllers: [CategoryController],
	providers: [CategoryService],
})
export class CategoryModule {}
