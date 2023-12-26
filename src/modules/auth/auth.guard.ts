import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_SKIP_AUTH } from './auth.constants';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly ref: Reflector) {
    super();
  }

  public canActivate(context: ExecutionContext) {
    const skip = this.ref.getAllAndOverride(IS_SKIP_AUTH, [
			context.getHandler(),
			context.getClass()
		])

    if (skip) return true;
		const request = context.switchToHttp().getRequest();
		const authorization = request.header('Authorization') || '';
		if(!authorization) {
      throw new UnauthorizedException('请先去登陆');
    }
    return super.canActivate(context);
  }
}
