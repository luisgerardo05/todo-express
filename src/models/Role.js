const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const RoleSchema = new Schema ({

	name: {
		type: String,
		required: true
	},
	
	actions: [],

});

module.exports = Role = mongoose.model ('roles', RoleSchema);