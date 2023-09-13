import { Transform } from 'class-transformer'
import { IsIn, IsNumber, IsOptional, Max, Min } from 'class-validator'

export enum SortType {
	Asc = 1, // 升序
	Desc = -1, // 降序
}

export class PaginateDto {
	@Min(3)
	@Max(50)
	@IsOptional()
	@Transform(({ value }) => Number(value))
	pageSize: number

	@Min(1)
	@IsOptional()
	@Transform(({ value }) => Number(value))
	pageNum: number

	@IsIn([SortType.Asc, SortType.Desc], {message: '请输入1(升序)或者-1(降序)'})
	@IsOptional()
	@Transform(({ value }) => Number(value))
	@IsNumber()
	sort: SortType.Asc | SortType.Desc
}

