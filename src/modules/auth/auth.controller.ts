import { Body, Controller, Post, Ip, Headers, HttpCode } from '@nestjs/common'
import { Msg } from '@/decorator/responser.decorator'
import { skipAuth } from '@/decorator/skipAuth.decorator'

import { AuthService } from './auth.service'
import { AuthDto } from './auth.dto'
import { Tokens } from './auth.type'

@Controller('auth')

export class AuthController {
	constructor(private authService: AuthService) {}

	@Post('login')
	@skipAuth()
	async login(@Body() data: AuthDto, @Ip() ip: string, @Headers('User-Agent') userAgent: string): Promise<Tokens> {
		return this.authService.login(data, ip, userAgent)
	}

	@Post('register')
	@Msg('注册成功')
	@skipAuth()
	@HttpCode(200)
	async register(@Body() data: AuthDto) {
		return this.authService.register(data)
	}

	@Post('refresh')
	async refresh(@Ip() ip: string, @Headers('User-Agent') userAgent: string, @Body('token') refreshToken: string) {
		return this.authService.refresh(ip, userAgent, refreshToken)
	}

	@Post('logout')
	async logout(@Body('token') refreshToken: string) {
		await this.authService.logout(refreshToken)
		return '退出成功'
	}
}
