var landmark = require('landmark-serve'),
	Types = landmark.Field.Types;

/**
 * PostCategory Model
 * ==================
 */

var PostCategory = new landmark.List('PostCategory', {
	autokey: { from: 'name', path: 'key', unique: true }
});

PostCategory.add({
	name: { type: String, required: true }
});

PostCategory.relationship({ ref: 'Post', path: 'categories' });

PostCategory.register();
