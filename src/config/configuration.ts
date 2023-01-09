import { Configuration } from './configuration.interface'

const configuration: Configuration = {
	security: {
		jwtSecret: 'revive',
		accessTokenExpiry: '1h',
	},
}

const configFunction = () => configuration
export default configFunction
