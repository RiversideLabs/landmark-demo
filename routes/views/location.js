var landmark = require('landmark-serve'),
	async = require('async');

exports = module.exports = function(req, res) {

	var view = new landmark.View(req, res),
		locals = res.locals;

	// Set locals
	locals.section = 'locations';
	locals.filters = {
		location: req.params.location
	};
	locals.data = {
		locations: []
	};

	// Load the current location
	view.on('init', function(next) {

		var q = landmark.list('Location').model.findOne({
			slug: locals.filters.location
		}).populate('author categories');

		q.exec(function(err, result) {
			locals.data.location = result;
			next(err);
		});

	});

	// Load other locations
	view.on('init', function(next) {

		var q = landmark.list('Location').model.find().sort('-publishedDate').limit('4');

		q.exec(function(err, results) {
			locals.data.locations = results;
			next(err);
		});

	});

	// Render the view
	view.render('location');

};
