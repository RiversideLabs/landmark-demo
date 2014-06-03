var landmark = require('landmark-serve'),
	Types = landmark.Field.Types;

/**
 * Gallery Model
 * =============
 */

var Gallery = new landmark.List('Gallery', {
	autokey: { from: 'name', path: 'key', unique: true }
});

Gallery.add({
	name: { type: String, required: true },
	publishedDate: { type: Date, default: Date.now },
	heroImage: { type: Types.CloudinaryImage },
	images: { type: Types.CloudinaryImages }
});

Gallery.register();
