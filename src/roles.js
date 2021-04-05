const ObjectId = require ("mongoose").Types.ObjectId;

const Role = require ('./models/Role');

var roles = [];

const getRoles = async () => {
	roles = await Role.find ({});
	console.log ("Roles retrieved!\n\n");
}

const findRoleById = (id) => {
	let role = roles.find (r => r.id == id);
	return role;
}

const findRoleByName = (name) => {
	let role = roles.find (r => r.name === name);
	return role;
}

module.exports = { getRoles, findRoleById, findRoleByName };