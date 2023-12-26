import { IS_SKIP_AUTH } from '../modules/auth/auth.constants';
import { SetMetadata } from '@nestjs/common'

export const skipAuth = () => SetMetadata(IS_SKIP_AUTH, true)
