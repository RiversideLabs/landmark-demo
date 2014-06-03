/**
 * This file is where you define your application routes and controllers.
 *
 * Start by including the middleware you want to run for every request;
 * you can attach middleware to the pre('routes') and pre('render') events.
 *
 * For simplicity, the default setup for route controllers is for each to be
 * in its own file, and we import all the files in the /routes/views directory.
 *
 * Each of these files is a route controller, and is responsible for all the
 * processing that needs to happen for the route (e.g. loading data, handling
 * form submissions, rendering the view template, etc).
 *
 * Bind each route pattern your application should respond to in the function
 * that is exported from this module, following the examples below.
 *
 * See the Express application routing documentation for more information:
 * http://expressjs.com/api.html#app.VERB
 */

var _ = require('underscore'),
	landmark = require('landmark-serve'),
	middleware = require('./middleware'),
	importRoutes = landmark.importer(__dirname);

// Common Middleware
landmark.pre('routes', middleware.initLocals);
landmark.pre('render', middleware.flashMessages);

// Import Route Controllers
var routes = {
  api: importRoutes('./api'),
	views: importRoutes('./views')
};

// Setup Route Bindings
exports = module.exports = function(app) {
  // CORS
  app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
  });

	// Views
	app.get('/', routes.views.index);
  app.get('/locations', routes.views.locations);
  app.get('/locations/location/:location', routes.views.location);
	app.get('/blog/:category?', routes.views.blog);
	app.get('/blog/post/:post', routes.views.post);
	app.get('/gallery', routes.views.gallery);
	app.all('/contact', routes.views.contact);

	// NOTE: To protect a route so that only admins can see it, use the requireUser middleware:
	// app.get('/protected', middleware.requireUser, routes.views.protected);

  // API
	app.all('/api*', landmark.initAPI);
	app.get('/api/location/list', landmark.initAPI, routes.api.locations.list);
	app.all('/api/location/create', landmark.initAPI, routes.api.locations.create);
	app.get('/api/location/:id', landmark.initAPI, routes.api.locations.get);
	app.all('/api/location/:id/update', landmark.initAPI, routes.api.locations.update);
	app.get('/api/location/:id/remove', landmark.initAPI, routes.api.locations.remove);

};
