import { FindOneOptions, ObjectLiteral, Repository } from 'typeorm'
import { PaginateDto } from './dto'

type PaginationReturn<Entity extends ObjectLiteral> = {
	list: Entity[]
	total: number
}

export const pagination = async <Entity extends ObjectLiteral>(
	query: Repository<Entity>,
	{ pageNum, pageSize }: PaginateDto,
	options?: FindOneOptions<Entity>,
): Promise<PaginationReturn<Entity>> => {
	const [list, total] = await query.findAndCount({
		skip: (pageNum - 1) * pageSize,
		take: pageSize,
		...options,
	})
	return {
		list,
		total,
	}
}
