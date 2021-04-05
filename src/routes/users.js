const fs = require ('fs');

const express = require ('express');
const router = express.Router ();

const jwt = require ('jsonwebtoken');
const jwt_key = fs.readFileSync (process.env.PRIV_KEY, 'utf8');

// load models
const User = require ('../models/User');
const Role = require ('../models/Role');

// load input Validation
const { validate_register_input } = require ('../validation/register');
const { validate_login_input } = require ('../validation/login');

// @route   GET api/users
// @desc    Tests users route
// @access  Public
router.get ('/', (req, res) => res.json ({ msg: 'Users Works' }));

// @route   POST api/users/register
// @desc    Register user
// @access  Public
router.post ('/register', (req, res) => {

	// check input validation
	let { errors, isValid } = validate_register_input (req.body);
	if (!isValid) return res.status (400).json (errors);

	// search for a user registerd with that email
	User.findOne ({ email: req.body.email })
		.then (user => {
			if (user) {
				errors.email = 'The email was already registered.';
				return res.status (400).json (errors);
			}

			else {
				// search for a user with that username
				User.findOne ({ username: req.body.username })
				.then (user => {
					if (user) {
						errors.username = 'Username already exists.';
						return res.status (400).json (errors);
					}

					else {
						// get the default role for the user
						Role.findOne({ name: 'common' })
							.then (role => {
								let new_user = new User ({
									// main info comes from input
									name: req.body.name,
									email: req.body.email,
									username: req.body.username,
									password: req.body.password,

									// default values
									// role: role._id
								});

								// add the new user to the db
								new_user.save ()
									.then (user => {
										return res.status (200).json ({ "oki": "doki" });
									})
									.catch (err => {
										console.error (err);
										res.status (500).json ({ "server": "Something went wrong!" });
									});
							});
					}
				})
				.catch (err => {
					console.error (err);
					res.status (500).json ({ "server": "Something went wrong!" });
				});
			}
		})
		.catch (err => {
			console.error (err);
			res.status (500).json ({ "server": "Something went wrong!" });
		});

});

// @route   POST api/users/login
// @desc    Login User / Returning JWT Token
// @access  Public
router.post ('/login', (req, res) => {

	console.log (req.body);

	// check input validation
	let { errors, isValid } = validate_login_input (req.body);
	if (!isValid) return res.status (400).json (errors);

	let email = req.body.email;
	let password = req.body.password;

	// find user by email
	User.findOne ({ email })
		.then (user => {
			if (!user) {
				errors.email = 'User not found.';
				return res.status (404).json (errors);
			}

			// check for password
			if (password === user.password) {
				// retrive user data
				let payload = {
					id: user.id,
					name: user.name,
					email: user.email,
					username: user.username
				};

				// generate token
				jwt.sign (payload, jwt_key, { algorithm: 'RS256' },
					(err, token) => {
						if (err) {
							console.error (err);
							errors.server = 'Internal error.';
							return res.status(500).json (errors);
						}

						return res.status (200).json ({
							success: true,
							token: 'Bearer ' + token
						});
					}
				);
			}

			else {
				errors.password = 'Password is incorrect.';
				return res.status (400).json (errors);
			}
		})
		.catch (err => {
			console.error (err);
			errors.email = 'User not found.';
			return res.status (400).json (errors);
		});

});

module.exports = router;