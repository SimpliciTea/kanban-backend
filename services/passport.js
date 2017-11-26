const passport = require('passport'),
			config = require('../config'),
			r = require('rethinkdb'),
			JwtStrategy = require('passport-jwt').Strategy,
			ExtractJwt = require('passport-jwt').ExtractJwt,
			LocalStrategy = require('passport-local'),
			bcrypt = require('bcrypt');

// Create local strategy
passport.use(new LocalStrategy({ 
  usernameField: 'email',
  passReqToCallback: true
}, (req, email, password, done) => {
	console.log('here');
	r.table('users').get(email).run(req._conn).then(user => {
		console.log(user);
		if (!user) { return done(null, false); }

		bcrypt.compare(password, user.password, (err, isMatch) => {
			if (err) { return done(err); }
			if (!isMatch) { return done(null, false, "Could not find matching credentials"); }
			else return done(null, user);
		})
	})
}));

passport.use(new JwtStrategy({
	jwtFromRequest: ExtractJwt.fromBodyField('auth'),
	secretOrKey: config.secret,
	passReqToCallback: true
}, (req, payload, done) => {
	r.table('users').get(payload.sub).run(req._conn).then(user => {
		if (user) return done(null, user);
		else return done(null, false);
	})
}))