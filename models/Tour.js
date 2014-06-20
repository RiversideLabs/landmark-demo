var landmark = require('landmark-serve'),
	Types = landmark.Field.Types;

/**
 * Tour Model
 * =============
 */

var Tour = new landmark.List('Tour', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true }
});

Tour.add({
	title: { type: String, required: true },
	publishedDate: { type: Date, noedit: true, collapse: true, default: Date.now },
	lastModified: { type: Date, noedit: true, collapse: true },
	type: { type: Types.Select, options: 'audio, video', default: 'audio', index: true },
	url: { type: Types.S3File, label: 'Video/Audio File', note: '.MP3 (audio) or .MP4/.M4V (video) files only. Amazon S3 must be configured in your app settings.' },
	length: { type: Types.Text },
	description: {
		brief: { type: Types.Html, wysiwyg: true, height: 150 },
		extended: { type: Types.Html, wysiwyg: true, height: 400 }
	}
});

Tour.schema.pre('save', function(next) {
	this.lastModified = Date.now();
	next();
});

Tour.schema.virtual('description.full').get(function() {
	return this.description.brief + this.description.extended;
});

Tour.relationship({ ref: 'Location', path: 'tours' });

Tour.defaultColumns = 'title, type|20%, publishedDate|20%';
Tour.register();
