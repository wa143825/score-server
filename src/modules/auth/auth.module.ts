import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule } from '@nestjs/config'
import { TokenModule } from '@/providers/token/token.module'
import { PassportModule } from '@nestjs/passport';

import { User } from '@/typeorm/User'
import { Session } from '@/typeorm/Session'
import { Profile } from '@/typeorm/Profile'

import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { JwtStrategy } from './jwt.strategy'

@Module({
	imports: [
		TypeOrmModule.forFeature([User, Session, Profile]),
		PassportModule,
		ConfigModule,
		TokenModule
	],
	controllers: [AuthController],
	providers: [AuthService, JwtStrategy],
	exports: [AuthService],
})
export class AuthModule {}
