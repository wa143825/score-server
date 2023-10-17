import { Module } from '@nestjs/common'
import { OrganizeController } from './organize.controller'
import { OrganizeService } from './organize.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Organize } from '@/typeorm/Organize'

@Module({
	imports: [TypeOrmModule.forFeature([Organize])],
	controllers: [OrganizeController],
	providers: [OrganizeService],
})
export class CategoryModule {}
