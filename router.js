'use strict';
const Auth = require('./controllers/auth'),
			r = require('rethinkdb'),
			config = require('./config');

module.exports = function(app) {
	app.use('*', getDbConnection);
	app.post('/auth/signup', Auth.signup);
}

const getDbConnection = (req, res, next) => {
	r.connect(config.rdb).then(conn => {
		req._conn = conn;
		next();
	})
}