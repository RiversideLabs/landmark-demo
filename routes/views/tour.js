var landmark = require('landmark-serve'),
	async = require('async');

exports = module.exports = function(req, res) {

	var view = new landmark.View(req, res),
		locals = res.locals;

	// Set locals
	locals.section = 'tours';
	locals.filters = {
		tour: req.params.tour
	};
	locals.data = {
		tours: []
	};

	// Load the current tour
	view.on('init', function(next) {

		var q = landmark.list('Tour').model.findOne({
			slug: locals.filters.tour
		}).populate('author categories');

		q.exec(function(err, result) {
			locals.data.tour = result;
			next(err);
		});

	});

	// Load other tours
	view.on('init', function(next) {

		var q = landmark.list('Tour').model.find().sort('-publishedDate').limit('4');

		q.exec(function(err, results) {
			locals.data.tours = results;
			next(err);
		});

	});

	// Render the view
	view.render('tour');

};
