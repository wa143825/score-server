import { FindOneOptions, ObjectLiteral, Repository } from 'typeorm'
import { PaginateDto } from './dto'

type PaginationReturn<Entity extends ObjectLiteral> = {
	list: Entity[]
	total: number,
	pageNum: number,
	pageSize: number,
}

export const pagination = async <Entity extends ObjectLiteral>(
	query: Repository<Entity>,
	{ pageNum = 1, pageSize = 10, sort = -1 }: PaginateDto,
	options?: FindOneOptions<Entity>,
): Promise<PaginationReturn<Entity>> => {
	const [list, total] = await query.findAndCount({
		skip: (pageNum - 1) * pageSize,
		take: pageSize,
		order: {
			
		},
		...options,
	})
	return {
		list,
		total,
		pageNum,
		pageSize,
	}
}
