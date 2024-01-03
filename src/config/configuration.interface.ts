export interface Configuration {
	app: {
		ttl: number
	},
	security: {
		jwtSecret: string
		accessTokenExpiry: string
		unusedRefreshTokenExpiryDays: number
	},
	redis: {
		namespace: string,
		host: string,
		port: number,
		username?: string
		password?: string
	}
}
