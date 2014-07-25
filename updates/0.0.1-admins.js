/**
 * This script automatically creates a default Admin user when an
 * empty database is used for the first time. You can use this
 * technique to insert data into any List you have defined.
 */

exports.create = {
	User: [
		{ email: 'user@getlandmarkproject.com', password: 'admin', name: { first: 'Admin', last: 'User' }, isAdmin: true }
	]
};

/**
 * The following is the older version of this update script, it is
 * left here for reference as an example of how more complex updates
 * can be structured.
 */
/*
var landmark = require('landmark-serve'),
	async = require('async'),
	User = landmark.list('User');

var admins = [
	{ email: 'user@getlandmarkproject.com', password: 'admin', name: { first: 'Admin', last: 'User' } }
];

function createAdmin(admin, done) {
	
	var newAdmin = new User.model(admin);
	
	newAdmin.isAdmin = true;
	newAdmin.save(function(err) {
		if (err) {
			console.error("Error adding admin " + admin.email + " to the database:");
			console.error(err);
		} else {
			console.log("Added admin " + admin.email + " to the database.");
		}
		done(err);
	});
	
}

exports = module.exports = function(done) {
	async.forEach(admins, createAdmin, done);
};
*/
