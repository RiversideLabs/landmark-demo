var landmark = require('landmark-serve'),
	Types = landmark.Field.Types;

/**
 * ArchitecturalStyle Model
 * ==================
 */

var ArchitecturalStyle = new landmark.List('ArchitecturalStyle', {
	autokey: { from: 'name', path: 'key', unique: true }
});

ArchitecturalStyle.add({
	name: { type: String, required: true }
});

ArchitecturalStyle.relationship({ ref: 'Location', path: 'architecturalStyle' });

ArchitecturalStyle.register();
