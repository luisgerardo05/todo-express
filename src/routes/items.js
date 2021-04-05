const express = require ('express');
const router = express.Router ();

const passport = require ('passport');

// load models
const ObjectId = require ("mongoose").Types.ObjectId;
const Item = require ('../models/Item');
const User = require ('../models/User');

// load input validation
const { validate_item_input } = require ('../validation/item');

// utils
const isEmpty = require ('../utils/is_empty');
const passport_authenticate_jwt = require ('../utils/passport_auth_jwt');

// @route   GET /api/todo/items
// @desc    Get all the authenticated user's items
// @access  Private
router.get ('/', passport_authenticate_jwt ((req, res, next) => {

	Item.find ({ "user": ObjectId (req.user.id) })
		.select ('_id title description date done completed')
		.then (items => {
			return res.status (200).json (items);
		})
		.catch (err => {
			console.error (err);
			return res.status (500).json ({server: "Failed to get items"});
		});

}));

// @route   POST /api/todo/items
// @desc    A user has requested to create a new item
// @access  Private
router.post ('/', passport_authenticate_jwt ((req, res, next) => {

	// validate input
	let { errors, isValid } = validate_item_input (req.body);

	if (isValid) {
		let new_item = new Item ({
			title: req.body.title,
			description: req.body.description,

			user: req.user.id
		});

		new_item.save ()
			.then (item => {
				console.log ("Created a new item!");
				return res.status (200).json ({ oki: 'doki' });
			})
			.catch (err => {
				console.error (err);
				return res.status (500);
			});
	}

	else return res.status (400).json (errors);

}));

// @route   GET /api/todo/items/:id/info
// @desc    Returns information about an existing item that belongs to a user
// @access  Private
router.get ('/:id/info', passport_authenticate_jwt ((req, res, next) => {

	Item.findOne ({
		"_id": req.params.id, "user": req.user.id
	})
		.then (item => {
			if (item) return res.status (200).json (item);
			else return res.status (404).json ({ item: 'No item found' });
		})
		.catch (err => {
			return res.status (404).json ({ item: 'No item found' });
		});

}));

// @route   PUT /api/todo/items/:id/update
// @desc    A user wants to update an existing item
// @access  Private
router.put ('/:id/update', passport_authenticate_jwt ((req, res, next) => {

	// validate input
	let { errors, isValid } = validate_item_input (req.body);

	if (isValid) {
		Item.findOne ({
			"_id": req.params.id, "user": req.user.id
		})
		.then (item => {
			if (item) {
				item.title = isEmpty (req.body.title) ? item.title : req.body.title;
				item.description = isEmpty (req.body.description) ? item.description : req.body.description;

				item.save ()
					.then (item => {
						console.log ("Updated existing item!");
						return res.status (200).json ({ oki: 'doki' });
					})
					.catch (err => {
						console.error (err);
						return res.status (500);
					});
			}

			else return res.status (404).json ({ item: 'No item found' });
		})
		.catch (err => {
			return res.status (404).json ({ item: 'No item found' });
		});
	}

	else return res.status (400).json (errors);

}));

// @route   DELETE /api/todo/items/:id/remove
// @desc    Deletes an existing user's item
// @access  Private
router.delete ('/:id/remove', passport_authenticate_jwt ((req, res, next) => {

	Item.findOneAndDelete ({
		"_id": req.params.id, "user": req.user.id
	})
		.then (item => {
			if (item) return res.status (200).json ({ oki: 'doki' });
			else return res.status (404).json ({ item: 'No item found' });
		})
		.catch (err => {
			return res.status (404).json ({ item: 'No item found' });
		});

}));

module.exports = router;