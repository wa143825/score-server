import { SetMetadata } from '@nestjs/common'

export const Msg = (value: string) => SetMetadata('msg', value)
