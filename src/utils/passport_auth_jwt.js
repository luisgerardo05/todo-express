const passport = require ('passport');

module.exports = function passport_authenticate_jwt (callback) {
	function hack (req, res, next) {
		passport.authenticate ('jwt', { session: false }, (err, user, info) => {
			if (err || !user) 
				return res.status (401).json ({ error: 'Failed to authenticate!'});

			req.user = user
			return callback (req, res, next);
		})(req, res, next);
	}

	return hack;
}