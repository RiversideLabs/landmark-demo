var async = require('async'),
	landmark = require('landmark-serve');

var Location = landmark.list('Location');

/**
 * List Locations
 */
exports.list = function(req, res) {
	Location.model.find(function(err, items) {

		if (err) return res.apiError('database error', err);

		res.apiResponse({
			locations: items
		});

	});
}

/**
 * Get Location by ID
 */
exports.get = function(req, res) {
	Location.model.findById(req.params.id).exec(function(err, item) {

		if (err) return res.apiError('database error', err);
		if (!item) return res.apiError('not found');

		res.apiResponse({
			location: item
		});

	});
}


/**
 * Create a Location
 */
exports.create = function(req, res) {

	var item = new Location.model(),
		data = (req.method == 'POST') ? req.body : req.query;

	item.getUpdateHandler(req).process(data, function(err) {

		if (err) return res.apiError('error', err);

		res.apiResponse({
			location: item
		});

	});
}

/**
 * Get Location by ID
 */
exports.update = function(req, res) {
	Location.model.findById(req.params.id).exec(function(err, item) {

		if (err) return res.apiError('database error', err);
		if (!item) return res.apiError('not found');

		var data = (req.method == 'POST') ? req.body : req.query;

		item.getUpdateHandler(req).process(data, function(err) {

			if (err) return res.apiError('create error', err);

			res.apiResponse({
				location: item
			});

		});

	});
}

/**
 * Delete Location by ID
 */
exports.remove = function(req, res) {
	Location.model.findById(req.params.id).exec(function (err, item) {

		if (err) return res.apiError('database error', err);
		if (!item) return res.apiError('not found');

		item.remove(function (err) {
			if (err) return res.apiError('database error', err);

			return res.apiResponse({
				success: true
			});
		});

	});
}
