import { Injectable, ConflictException, UnauthorizedException, UnprocessableEntityException, NotFoundException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { compare, hash } from 'bcryptjs'
import UAParser from 'ua-parser-js'

import { User } from '@/typeorm/User'
import { Session } from '@/typeorm/Session'
import { Profile } from '@/typeorm/Profile'
import { USER_CONFLICT, USER_NOT_FOUND, INVALID_PASSWORD, INCORRECT_PASSWORD, NO_TOKEN_PROVIDED, SESSION_NOT_FOUND } from '@/constant/errors.constant'
import { LOGIN_accessToken } from '@/constant/access.constant'
import { TokenService } from '@/providers/token/token.service'
import { AuthDto } from './auth.dto'
import { Tokens } from './auth.type'

@Injectable()
export class AuthService {
	constructor(
		@InjectRepository(User) private userRepository: Repository<User>,
		@InjectRepository(Session) private sessionRepository: Repository<Session>,
		@InjectRepository(Profile) private ProfileRepository: Repository<Profile>,
		private configService: ConfigService,
		private tokenService: TokenService,
	) {}

	// 用户注册
	async register(params: AuthDto) {
		const { phone, password } = params
		const user = await this.userRepository.findOneBy({ phone })
		if (user) throw new ConflictException(USER_CONFLICT)
		const newUser = this.userRepository.create({ phone, password: await this.hashAndValidatePassword(password) })
		const newProfile = this.ProfileRepository.create({nickname: `用户${phone.substring(7,11)}`})
		newUser.profile = newProfile
		await this.ProfileRepository.save(newProfile)
		await this.userRepository.save(newUser)
		return true
	}

	// 用户登陆
	async login(params: AuthDto, ip: string, userAgent: string): Promise<Tokens> {
		const { phone, password } = params
		const user = await this.userRepository.findOneBy({ phone })
		if (!user) throw new ConflictException(USER_NOT_FOUND)
		if (!password || !user.password) throw new UnauthorizedException(INVALID_PASSWORD)
		if (!(await compare(password, user.password))) throw new UnauthorizedException(INCORRECT_PASSWORD)
		return this.loginResponse(user, ip, userAgent)
	}

	async refresh(ipAddress: string, userAgent: string, token: string): Promise<Tokens> {
		if (!token) throw new UnprocessableEntityException(NO_TOKEN_PROVIDED)
		const session = await this.sessionRepository.findOne({
			where: {
				token,
			},
			relations: ['user'],
		})
		if (!session) throw new NotFoundException(SESSION_NOT_FOUND)
		await this.sessionRepository.update(
			{ token },
			{
				ipAddress,
				userAgent,
			},
		)
		return {
			accessToken: await this.getAccessToken(session.user, session.id),
			refreshToken: token,
		}
	}

	async logout(token: string) {
		if (!token) throw new UnprocessableEntityException(NO_TOKEN_PROVIDED)
		const session = await this.sessionRepository.findOne({
			where: { token },
			select: { id: true, user: { id: true } },
		})
		if (!session) throw new NotFoundException(SESSION_NOT_FOUND)
		await this.sessionRepository.delete({ id: session.id })
	}

	// 生成一个随机字符串
	async hashAndValidatePassword(password: string): Promise<string> {
		return await hash(password, this.configService.get<number>('security.saltRounds') ?? 10)
	}

	private async loginResponse(user: User, ipAddress: string, userAgent: string): Promise<Tokens> {
		const token = await this.tokenService.generateRandomString(32)
		const ua = new UAParser(userAgent)
		const newSession = await this.sessionRepository.create({
			ipAddress,
			token,
			user,
			userAgent,
			browser: `${ua.getBrowser().name ?? ''} ${ua.getBrowser().version ?? ''}`.trim() || '',
			operatingSystem: `${ua.getOS().name ?? ''} ${ua.getOS().version ?? ''}`.replace('Mac OS', 'macOS').trim() || '',
		})
		this.sessionRepository.save(newSession)
		return {
			accessToken: await this.getAccessToken(user, newSession.id),
			refreshToken: token,
		}
	}

	// 生成一个token
	private async getAccessToken(user: User, sessionId: number) {
		const payload = {
			id: user.id,
			sessionId,
		}
		return this.tokenService.signJwt(LOGIN_accessToken, payload, this.configService.get<string>('security.accessTokenExpiry'))
	}
}
