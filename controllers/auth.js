'use strict';
const jwt = require('jwt-simple');
const config = require('../config');
const r = require('rethinkdb');
const utils = require('../rdbUtils');
const bcrypt = require('bcrypt');

const tokenForUser = user => {
	const timestamp = new Date().getTime();
	return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
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
				password: hashedPassword 
			}).run(req._conn).then(result => {
				req._conn.close();
				return res.json({ token: tokenForUser(email) });
			})
		});

	}).catch(err => {
		console.log('error: ', err);
	})
}