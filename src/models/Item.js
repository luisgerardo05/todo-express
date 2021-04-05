const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema ({

	user: {
		type: Schema.Types.ObjectId,
		ref: 'users'
	},

	title: {
		type: String,
		required: true
	},

	description: {
		type: String,
		required: true
	},

	date: {
		type: Date,
		default: Date.now
	},

	done: {
		type: Boolean,
		default: false,
	},

	completed: {
		type: Date,
		default: Date.now
	}

});

module.exports = Item = mongoose.model ('items', ItemSchema);