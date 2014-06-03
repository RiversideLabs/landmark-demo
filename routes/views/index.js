var landmark = require('landmark-serve');

exports = module.exports = function(req, res) {
	
	var locals = res.locals,
		view = new landmark.View(req, res);
	
	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'home';
	
	// Render the view
	view.render('index');
	
};
