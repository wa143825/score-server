import { DataSource, DataSourceOptions } from 'typeorm'

const baseConfig: DataSourceOptions = {
	type: 'mysql',
	host: 'localhost',
	port: 3306,
	username: 'root',
	password: 'Ma13578960..',
	database: 'score',
	entities: [],
	synchronize: true,
}

const dataSource = new DataSource(baseConfig)

export default dataSource
