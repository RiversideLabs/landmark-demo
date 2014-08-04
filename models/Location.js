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
	images_sized: {
		big: { type: Types.Url, hidden: true },
		large: { type: Types.Url, hidden: true },
		medium: { type: Types.Url, hidden: true },
		small: { type: Types.Url, hidden: true },
		thumb_x2: { type: Types.Url, hidden: true },
		thumb: { type: Types.Url, hidden: true }
  },
	tours: { type: Types.Relationship, ref: 'Tour', index: true, many: true, hidden: true},
});

Location.relationship({ path: 'tours', ref: 'Tour', refPath: 'location' });

Location.schema.pre('save', function(next) {
	var _this = this;
	
	this.heroThumb = this._.heroImage.thumbnail(640,300,{ quality: 60 });
	this.heroDetail = this._.heroImage.thumbnail(640,640,{ quality: 60 });
	
	this.images.forEach(function(img) {

    // process images on upload
    if (img.isModified() || img.isNew()) {
			_this.images_sized.big    = img.limit(2100, 2100, { quality: 80 });
      _this.images_sized.large    = img.limit(1600, 1600, { quality: 80 });
			_this.images_sized.medium    = img.limit(1280, 1280, { quality: 80 });
			_this.images_sized.small  = img.limit(750, 750,   { quality: 60  });
      _this.images_sized.thumb_x2  = img.thumbnail(320, 180,   { quality: 40  });
			_this.images_sized.thumb  = img.thumbnail(160, 90,   { quality: 40  });
    }

  });
	
	
	
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
