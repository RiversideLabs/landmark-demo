var async = require('async'),
 landmark = require('landmark-serve'),
		async = require('async'),
				_ = require('underscore');

var Location = landmark.list('Location'),
				Tour = landmark.list('Tour');

/**
 * List Locations
 * /api/locations/list for GET
 */
exports.list = function(req, res) {
	Location.model.find().populate('tours').populate('architecturalStyle').exec(function(err, items) {

		if (err) return res.apiError('database error', err);
		
		res.apiResponse({
			locations: items
		});

	});
	
}

/**
 * Get Location by ID
 * /api/locations/:location_id for GET
 */
exports.get = function(req, res) {
	
	Location.model.findById(req.params.id).populate('tours').populate('architecturalStyle').exec(function(err, item) {
		
		if (err) return res.apiError('database error', err);
		if (!item) return res.apiError('not found');
		
		res.apiResponse({
			location: item
		});
		
	});
}
