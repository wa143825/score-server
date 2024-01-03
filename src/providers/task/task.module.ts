import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule } from '@nestjs/config'
import { TaskService } from "./task.service";
import { Session } from "@/typeorm/Session";

@Module({
	imports: [
		TypeOrmModule.forFeature([Session]),
		ConfigModule
	],
	providers: [TaskService],
	exports: [TaskService]
})
export class TaskModule {}
