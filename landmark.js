// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
require('dotenv').load();

// Require landmark
var landmark = require('landmark-serve');

// Initialise Landmark with your project's configuration.
// See http://landmarkjs.com/guide/config for available options
// and documentation.

landmark.init({

	'name': 'My Site',
	'brand': 'My Site',

	'less': 'public',
	'static': 'public',
	'favicon': 'public/favicon.ico',

	'views': 'templates/views',
	'view engine': 'jade',

	'emails': 'templates/emails',

	'auto update': true,

	'session': true,
	'auth': true,
	'user model': 'User',
	'cookie secret': 'GJ!dB$HP4!NDffuL=8ln)t0F,_KX,GNf4Gcx8zx59?ho1nrLO&<FT3,F{$8#`v,_'

});

// Load your project's Models

landmark.import('models');

// Setup common locals for your templates. The following are required for the
// bundled templates and layouts. Any runtime locals (that should be set uniquely
// for each request) should be added to ./routes/middleware.js

landmark.set('locals', {
	_: require('underscore'),
	env: landmark.get('env'),
	utils: landmark.utils,
	editable: landmark.content.editable
});

// Load your project's Routes

landmark.set('routes', require('./routes'));

// Setup common locals for your emails. The following are required by Landmark's
// default email templates, you may remove them if you're using your own.

landmark.set('email locals', {
	logo_src: '/images/logo-email.gif',
	logo_width: 194,
	logo_height: 76,
	theme: {
		email_bg: '#f9f9f9',
		link_color: '#2697de',
		buttons: {
			color: '#fff',
			background_color: '#2697de',
			border_color: '#1a7cb7'
		}
	}
});

// Setup replacement rules for emails, to automate the handling of differences
// between development a production.

// Be sure to update this rule to include your site's actual domain, and add
// other rules your email templates require.

landmark.set('email rules', [{
	find: '/images/',
	replace: (landmark.get('env') == 'production') ? 'http://www.your-server.com/images/' : 'http://localhost:3000/images/'
}, {
	find: '/landmark/',
	replace: (landmark.get('env') == 'production') ? 'http://www.your-server.com/landmark/' : 'http://localhost:3000/landmark/'
}]);

// Load your project's email test routes

landmark.set('email tests', require('./routes/emails'));

// Configure the navigation bar in Landmark's Admin UI

landmark.set('nav', {
	'locations': ['locations', 'architectural-styles'],
	'tours': 'tours',
	'posts': ['posts', 'post-categories'],
	'galleries': 'galleries',
	'enquiries': 'enquiries',
	'users': 'users'
});

// Start Landmark to connect to your database and initialise the web server

landmark.start();
