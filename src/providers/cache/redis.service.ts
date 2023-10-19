import { Injectable } from '@nestjs/common'
import { createClient, RedisClientType } from 'redis'
import { createRedisStore, RedisStore, RedisClientOptions } from './redis.store'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class RedisService {
	private redisStore!: RedisStore
	private redisClient!: RedisClientType

	constructor(
		private configService: ConfigService,
	) {
		this.redisClient = createClient()
		this.redisStore = createRedisStore(this.redisClient, {
      defaultTTL: this.configService.get('app.ttl'),
      namespace: this.configService.get('redis.namespace')
    })

    this.redisClient.on('connect', () => console.info('connecting...'))
    this.redisClient.on('reconnecting', () => console.warn('reconnecting...'))
    this.redisClient.on('ready', () => console.info('readied (connected).'))
    this.redisClient.on('end', () => console.error('client end!'))
    this.redisClient.on('error', (error) => console.error(`client error!`, error.message))
    this.redisClient.connect()
	}

	private retryStrategy(retries: number): number | Error {
    const errorMessage = `retryStrategy! retries: ${retries}`
    console.error(errorMessage)
    if (retries > 6) {
      return new Error('Redis maximum retries!')
    }
    return Math.min(retries * 1000, 3000)
  }

	private getOptions(): RedisClientOptions {
    const redisOptions: RedisClientOptions = {
      socket: {
        host: this.configService.get('redis.host'),
        port: this.configService.get('redis.port') as number,
        reconnectStrategy: this.retryStrategy.bind(this)
      }
    }
    if (this.configService.get('redis.username')) {
      redisOptions.username = this.configService.get('redis.username')
    }
    if (this.configService.get('redis.password')) {
      redisOptions.password = this.configService.get('redis.password')
    }

    return redisOptions
  }



  public get client(): RedisClientType {
    return this.redisClient
  }

  public get store(): RedisStore {
    return this.redisStore
  }
}
