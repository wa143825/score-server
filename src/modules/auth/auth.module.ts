import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule } from '@nestjs/config'
import { TokenModule } from '@/providers/token/token.module'

import { User } from '@/typeorm/User'
import { Session } from '@/typeorm/Session'
import { Profile } from '@/typeorm/Profile'

import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'

@Module({
	imports: [TypeOrmModule.forFeature([User, Session, Profile]), ConfigModule, TokenModule],
	controllers: [AuthController],
	providers: [AuthService],
	exports: [AuthService],
})
export class AuthModule {}
