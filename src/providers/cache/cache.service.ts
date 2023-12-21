import { Injectable } from '@nestjs/common'
import schedule from 'node-schedule'
import { isNil } from "@/constant/value.constant";
import { RedisService } from "./redis.service";

export interface CacheBaseOptions<T> {
	key: string
	promise(): Promise<T>
}

export interface CacheManualResult<T> {
	get(): Promise<T>
	update(): Promise<T>
}

export interface CacheIntervalOptions<T> extends CacheBaseOptions<T> {
	interval: number
	retry: number
}

export interface CacheScheduleOptions<T> extends CacheBaseOptions<T> {
	schedule: number
	retry: number
}

@Injectable()
export class CacheService {
	constructor(private readonly redisService: RedisService) {}

	public set(
		key: string,
		value: any,
		ttl?: number
	): Promise<void> {
		return this.redisService.store.set(key,value,ttl)
	}

	public get<T>(key: string): Promise<T> {
		return this.redisService.store.get<T>(key) as Promise<T>
	}

	private async execPromise<T>(options: CacheBaseOptions<T>): Promise<T> {
    const data = await options.promise()
    await this.set(options.key, data)
    return data
  }

	public async once<T>(options: CacheBaseOptions<T>): Promise<T> {
    const data = await this.get<T>(options.key)
    return isNil(data) ? await this.execPromise<T>(options) : data
  }

	public manual<T>(options: CacheBaseOptions<T>): CacheManualResult<T> {
    return {
      get: () => this.once<T>(options),
      update: () => this.execPromise<T>(options)
    }
  }

	public interval<T>(options: CacheIntervalOptions<T>): () => Promise<T> {
		const execIntervalTask = () => {
			this.execPromise(options)
				.then(() => {
					setTimeout(execIntervalTask, options.interval)
				})
				.catch(error => {
					setTimeout(execIntervalTask, options.retry)
				})
		}

		execIntervalTask()
		return () => this.get(options.key)
	}

	public schedule<T>(options: CacheScheduleOptions<T>): () => Promise<T> {
    const execScheduleTask = () => {
      this.execPromise(options).catch((error) => {
        setTimeout(execScheduleTask, options.retry)
      })
    }
    execScheduleTask()
    schedule.scheduleJob(options.schedule, execScheduleTask)
    return () => this.get(options.key)
  }
}
