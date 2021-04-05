const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const ActionSchema = new Schema ({

	name: {
		type: String,
		required: true
	},
	
	description: {
		type: String,
		required: true
	},

});

module.exports = Action = mongoose.model ('actions', ActionSchema);