import { Module } from '@nestjs/common'
import { CategoryController } from './category.controller'
import { CategoryService } from './category.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ArticleCategory } from '@/typeorm/Category'

@Module({
	imports: [TypeOrmModule.forFeature([ArticleCategory])],
	controllers: [CategoryController],
	providers: [CategoryService],
})
export class TagModule {}
