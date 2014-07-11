var landmark = require('landmark-serve'),
			_ = require('underscore'),
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
	heroThumb: {type: Types.Url, hidden: true},
	heroDetail: {type: Types.Url, hidden: true},
	location: { type: Types.Location },
	description: {
		brief: { type: Types.Html, wysiwyg: true, height: 150 },
		extended: { type: Types.Html, wysiwyg: true, height: 400 }
	},
	plaqueText: { type: Types.Html, wysiwyg: true, height: 150 },
	yearBuilt: { type: Types.Text },
	architect: { type: Types.Text },
	builder: { type: Types.Text },
	architecturalStyle: { type: Types.Relationship, ref: 'ArchitecturalStyle', many: true },
	url: { type: Types.Url },
	images: { type: Types.CloudinaryImages },
	tours: { type: Types.Relationship, ref: 'Tour', index: true, many: true},
});

Location.relationship({ path: 'tours', ref: 'Tour', refPath: 'location' });

Location.schema.pre('save', function(next) {
	this.heroThumb = this._.heroImage.thumbnail(640,300,{ quality: 60 });
	this.heroDetail = this._.heroImage.thumbnail(640,640,{ quality: 60 });
	this.lastModified = Date.now();
	next();
});

Location.schema.virtual('description.full').get(function() {
	return this.description.brief + this.description.extended;
});

Location.schema.virtual('location.formattedAddress').get(function() {
	return this.location.street1 + ', ' + this.location.suburb + ', ' + this.location.state + ' ' + this.location.postcode;
});

// Resize hero image for list view
// Location.schema.virtual('heroThumb').get(function() {
// 	if (this.heroImage.exists) return this._.heroImage.fill(1000,470);
// });

Location.defaultColumns = 'commonName, historicName|20%, yearBuilt|20%, publishedDate|20%';
Location.register();
