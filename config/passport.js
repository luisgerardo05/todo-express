const fs = require ('fs');

const JwtStrategy = require ('passport-jwt').Strategy;
const ExtractJwt = require ('passport-jwt').ExtractJwt;

const PUB_KEY = fs.readFileSync (process.env.PUB_KEY, 'utf8');

const { findRoleById } = require("../src/roles");

// load models
const User = require ('../src/models/User');

let opts = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken (),
	secretOrKey: PUB_KEY
};

module.exports = passport => {

	passport.use (new JwtStrategy (opts, (jwt_payload, done) => {
		User.findById (jwt_payload.id)
		.then (user => {
			if (user) {
				let userPopulated = {
					...user._doc,
					role: findRoleById (user.role)
				};
				return done (null, userPopulated);
			}
			else return done (null, false);
		})
		.catch (err => console.error (err));
	}));

}