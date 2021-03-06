'use strict';
const r = require('rethinkdb'),
		  jwt = require('jwt-simple'),
		  bcrypt = require('bcrypt'),
		  config = require('../config'),
		  boards = require('./boards');


const tokenForUser = user => {
	const timestamp = Date.now();
	return jwt.encode({ sub: user, iat: timestamp }, config.secret);
}

exports.signin = (req, res, next) => {
	// sign in authentication is handled in passport middleware
	res.send({ token: tokenForUser(req.body.email) })
}

exports.signup = (req, res, next) => {
	const { email, password } = req.body;

	if (!email || !password) {
		return res.status(422).send({ error: 'You must provide email and password' });
	}

	// check for existing user with given email
	r.table('users').get(email).run(req._conn).then(result => {
		
		// if a user already exists, close connection and return err
		if (result) {
			req._conn.close();
			console.log('exists: ', result);
			return res.status(422).send({ error: 'Email is in use' });
		}

		// hash password before saving to DB
		bcrypt.hash(password, 10).then(hashedPassword => {
			r.table('users').insert({	
				email, 
				password: hashedPassword,
				boardIds: []
			}).run(req._conn).then(result => {
				req._conn.close();
				return res.json({ token: tokenForUser(email) });
			})
		});

	}).catch(err => {
		console.log('error: ', err);
	})
};