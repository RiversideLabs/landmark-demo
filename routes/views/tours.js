var landmark = require('landmark-serve'),
	async = require('async');

exports = module.exports = function(req, res) {

	var view = new landmark.View(req, res),
		locals = res.locals;

	// Init locals
	locals.section = 'tours';
	locals.filters = {
		category: req.params.category
	};
	locals.data = {
		tours: []
	};

	// Load the tours
	view.on('init', function(next) {

		var q = landmark.list('Tour').paginate({
				page: req.query.page || 1,
				perPage: 10,
				maxPages: 10
			})
			.sort('-publishedDate');


		q.exec(function(err, results) {
			locals.data.tours = results;
			next(err);
		});

	});

	// Render the view
	view.render('tours');

};
