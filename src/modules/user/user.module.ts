import { Module } from '@nestjs/common'
import { UserController } from './user.controller'
import { UserService } from './user.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from '@/typeorm/User'
import { Profile } from '@/typeorm/Profile'

@Module({
	imports: [TypeOrmModule.forFeature([User, Profile])],
	controllers: [UserController],
	providers: [UserService],
})
export class UserModule {}
