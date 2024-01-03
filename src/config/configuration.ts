import { Configuration } from './configuration.interface'

const configuration: Configuration = {
	app: {
		ttl: 0
	},
	security: {
		jwtSecret: 'revive',
		accessTokenExpiry: '30d',
		unusedRefreshTokenExpiryDays: 30
	},
	redis: {
		namespace: 'score',
		host: 'localhost',
		port: 6379,
		username: '',
		password: '',
	}
}

const configFunction = () => configuration
export default configFunction
