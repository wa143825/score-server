import { Injectable, NestMiddleware } from '@nestjs/common'
import { NextFunction, Request, Response } from 'express';
import { TokenService } from '@/providers/token/token.service'
import { LOGIN_accessToken } from '@/constant/access.constant'
import { ITokenPayload } from '@/modules/auth/auth.interface'


@Injectable()
export class TokenMiddleware implements NestMiddleware {
    constructor(
			private tokenService: TokenService
		) {}

    use(req: Request, res: Response, next: NextFunction) {
        const token = req.headers.authorization
        if (token) {
					const decodeToken: ITokenPayload = this.tokenService.verify(LOGIN_accessToken, token)
					req.body.modifier = decodeToken.id
					if (req.method === 'POST') {
						req.body.creator = decodeToken.id
					}
        }
				next()
    }
}
