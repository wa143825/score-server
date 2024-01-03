import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Cron, CronExpression } from '@nestjs/schedule'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, MoreThanOrEqual } from 'typeorm'
import { Session } from '@/typeorm/Session'

@Injectable()
export class TaskService {
	constructor(
		private configService: ConfigService,
		@InjectRepository(Session) private sessionRepository: Repository<Session>,
	) {}

	@Cron(CronExpression.EVERY_DAY_AT_1PM)
	async deleteOldSessions() {
		const now = new Date()
		const unusedRefreshTokenExpiryDays = this.configService.get('security.unusedRefreshTokenExpiryDays') ?? 30
		now.setDate(now.getDate() - unusedRefreshTokenExpiryDays);
		const deleted = await this.sessionRepository.delete({
			modifyAt: MoreThanOrEqual(now)
		})
		if (deleted.affected) {
			console.log(`已经删除了${deleted.affected}条过期的session`);
		}

	}
}
