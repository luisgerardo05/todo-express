const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema ({

	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	username: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	
	items_count: {
		type: Number,
		default: 0
	}

});

module.exports = User = mongoose.model ('users', UserSchema);