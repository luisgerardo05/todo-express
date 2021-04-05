const express = require ('express');
const router = express.Router ();

const version = require ('../version');

const passport_authenticate_jwt = require ('../utils/passport_auth_jwt');

// @route   GET api/todo
// @desc    Top level route
// @access  Public
router.get ('/test', (req, res) => {

    return res.json ({ msg: 'Todo works!' })

});

// @route   GET api/todo/auth
// @desc    Test authentication with jwt
// @access  Private
router.get ('/auth', passport_authenticate_jwt ((req, res, next) => {

    return res.json ({ oki: 'doki!' })

}));

// @route   GET api/todo/version
// @desc    Gets the current api version
// @access  Public
router.get ('/version', (req, res) => {

    return res.json ({msg: `${version.version_name} - ${version.version_date}` })

});

// @route   HEAD api/todo/version
// @desc    Gets the current api version
// @access  Public
router.head ('/version', (req, res) => {

    return res.json ({ msg: `${version.version_name} - ${version.version_date}` });

});

module.exports = router;