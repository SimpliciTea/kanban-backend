'use strict';
const Auth = require('./controllers/auth'),
			Boards = require('./controllers/boards'),
			r = require('rethinkdb'),
			config = require('./config');

module.exports = function(app) {
	app.use('*', getDbConnection);
	app.post('/auth/signup', Auth.signup);
	app.post('/boards/create', Boards.create);
	app.post('/boards/read', Boards.read);
}

const getDbConnection = (req, res, next) => {
	r.connect(config.rdb).then(conn => {
		req._conn = conn;
		next();
	})
}