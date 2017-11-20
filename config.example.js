module.exports = {
	rdb: {
		host: process.env.RDB_HOST || "localhost",
		port: process.env.RDB_PORT || 28015,
		db: process.env.RDB_DB || 'kanban'
	},
	express: {
		port: process.env.APP_PORT || 3090
	},
	secret: 'itsabigbadsecret'
}