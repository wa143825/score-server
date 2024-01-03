import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { SignOptions, sign, VerifyOptions, verify } from 'jsonwebtoken'
import cryptoRandomString from 'crypto-random-string'

const JWT_SECRET = 'security.jwtSecret'

@Injectable()
export class TokenService {
	constructor(private configService: ConfigService) {}

	signJwt(subject: string, payload: number | string | Record<string, any> | Buffer, expiresIn?: string, options?: SignOptions) {
		if (typeof payload === 'number') payload = payload.toString()
		return sign(payload, this.configService.get<string>(JWT_SECRET) ?? '', {
			...options,
			subject,
			expiresIn,
		})
	}

	verify<T>(subject: string, token: string, options?: VerifyOptions) {
		try {
			return verify(token, this.configService.get<string>(JWT_SECRET) ?? '', {
				...options,
				subject,
			}) as any as T
		} catch (error) {
			throw new UnauthorizedException('无效的token')
		}
	}

	async generateRandomString(length = 32, charactersOrType = 'alphanumeric'): Promise<string> {
		if (['hex', 'base64', 'url-safe', 'numeric', 'distinguishable', 'ascii-printable', 'alphanumeric'].includes(charactersOrType))
			return cryptoRandomString({
				length,
				type: charactersOrType as 'hex' | 'base64' | 'url-safe' | 'numeric' | 'distinguishable' | 'ascii-printable' | 'alphanumeric',
			})
		return cryptoRandomString({ length, characters: charactersOrType })
	}
}
