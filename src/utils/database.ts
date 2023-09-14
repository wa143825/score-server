import { FindOneOptions, ObjectLiteral, Repository } from 'typeorm'
import { PaginateDto } from './dto'

type PaginationReturn<Entity extends ObjectLiteral> = {
	items: Entity[]
	count: number,
	pageNum: number,
	pageSize: number,
}

export const pagination = async <Entity extends ObjectLiteral>(
	query: Repository<Entity>,
	{ pageNum = 1, pageSize = 10 }: PaginateDto,
	options?: FindOneOptions<Entity>,
): Promise<PaginationReturn<Entity>> => {
	const [items, count] = await query.findAndCount({
		skip: (pageNum - 1) * pageSize,
		take: pageSize,
		...options
	})
	return {
		items,
		count,
		pageNum,
		pageSize,
	}
}
