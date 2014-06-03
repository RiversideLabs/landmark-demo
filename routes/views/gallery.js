var landmark = require('landmark-serve');

exports = module.exports = function(req, res) {
	
	var view = new landmark.View(req, res),
		locals = res.locals;
	
	// Set locals
	locals.section = 'gallery';
	
	// Load the galleries by sortOrder
	view.query('galleries', landmark.list('Gallery').model.find().sort('sortOrder'));
	
	// Render the view
	view.render('gallery');
	
};
