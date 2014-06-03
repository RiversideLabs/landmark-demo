var landmark = require('landmark-serve'),
	Types = landmark.Field.Types;

/**
 * Location Model
 * =============
 */

var Location = new landmark.List('Location', {
	map: { name: 'commonName' },
	autokey: { path: 'slug', from: 'commonName', unique: true }
});

Location.add({
	commonName: { type: String, required: true },
	historicName: { type: String },
	publishedDate: { type: Date, noedit: true, collapse: true, default: Date.now },
	lastModified: { type: Date, noedit: true, collapse: true },
	heroImage: { type: Types.CloudinaryImage },
	location: { type: Types.Location },
	description: {
		brief: { type: Types.Html, wysiwyg: true, height: 150 },
		extended: { type: Types.Html, wysiwyg: true, height: 400 }
	},
	plaqueText: { type: Types.Html, wysiwyg: true, height: 150 },
	yearBuilt: { type: Types.Text },
	architect: { type: Types.Text },
	builder: { type: Types.Text },
	architecturalStyle: { type: Types.Text },
	url: { type: Types.Url },
	images: { type: Types.CloudinaryImages },
	tours: [{
		type: { type: Types.Select, options: 'audio, video', default: 'audio', index: true },
		title: { type: Types.Text },
		url: { type: Types.S3File, label: 'Video/Audio File', note: '.MP3 (audio) or .MP4/.M4V (video) files only. Amazon S3 must be configured in your app settings.' },
		length: { type: Types.Text },
	}]
});

Location.schema.pre('save', function(next) {
	this.lastModified = Date.now();
	next();
});

Location.schema.virtual('description.full').get(function() {
	return this.description.brief + this.description.extended;
});

Location.schema.virtual('location.formattedAddress').get(function() {
	return this.location.street1 + ', ' + this.location.suburb + ', ' + this.location.state + ' ' + this.location.postcode;
});

Location.defaultColumns = 'commonName, historicName|20%, yearBuilt|20%, publishedDate|20%';
Location.register();
