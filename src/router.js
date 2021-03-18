'use strict';
const Auth = require('./controllers/auth'),
			Boards = require('./controllers/boards'),
			r = require('rethinkdb'),
			config = require('./config'),
			passportService = require('./services/passport'),
			passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignIn = passport.authenticate('local', { session: false });

module.exports = function(app) {
	app.all('*', getDbConnection);
	app.post('/auth/signup', Auth.signup);
	app.post('/auth/signin', requireSignIn, Auth.signin);
	app.post('/boards/create', requireAuth, Boards.create);
	app.post('/boards/read', requireAuth, Boards.read);
	app.post('/boards/update', requireAuth, Boards.update);
}

const getDbConnection = (req, res, next) => {
	r.connect(config.rdb).then(conn => {
		req._conn = conn;
		next();
	})
}