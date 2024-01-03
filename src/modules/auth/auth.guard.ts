import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_SKIP_AUTH } from './auth.constants';
import { ITokenPayload } from './auth.interface';
import { TokenService } from '@/providers/token/token.service'
import { LOGIN_accessToken } from '@/constant/access.constant'

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
		private readonly ref: Reflector,
		private tokenService: TokenService
	) {
    super();
  }

  public canActivate(context: ExecutionContext) {
    const skip = this.ref.getAllAndOverride(IS_SKIP_AUTH, [
			context.getHandler(),
			context.getClass()
		])

    if (skip) return true;
		const request = context.switchToHttp().getRequest();
		let bearerToken = request.header('Authorization') || '';
		if(!bearerToken) {
      throw new UnauthorizedException('请先去登陆');
    }
		if (bearerToken.startsWith('Bearer ')) {
			bearerToken = bearerToken.replace('Bearer ', '')
		}
		const payload:ITokenPayload = this.tokenService.verify(
			LOGIN_accessToken,
			bearerToken
		)
		if (payload.id) {
			return true
		}


    return super.canActivate(context);
  }
}
