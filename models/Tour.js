var landmark = require('landmark-serve'),
	Types = landmark.Field.Types;

/**
 * Tour Model
 * =============
 */

var Tour = new landmark.List('Tour', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true },
	sortable: true,
	sortContext: 'Location:tours'
});

Tour.add({
	title: { type: String, required: true },
	publishedDate: { type: Date, noedit: true, collapse: true, default: Date.now },
	lastModified: { type: Date, noedit: true, collapse: true },
	location: { type: Types.Relationship, ref: 'Location' },
	type: { type: Types.Select, options: 'audio, video', default: 'audio', index: true },
	url: { type: Types.S3File, label: 'Video/Audio File', allowedTypes:['audio/mp4', 'audio/mp3', 'audio/mpeg', 'video/mp4', 'video/x-m4v'], note: '.MP3 (audio) or .MP4/.M4V (video) files only. Amazon S3 must be configured in your app settings.' },
	length: { type: Types.Text }
});

Tour.schema.pre('save', function(next) {
	this.lastModified = Date.now();
	next();
});

Tour.schema.post('save', function(done) {
  var doc = this;
  if(doc.location) {
    landmark.list('Location').model.findOne().where('_id',doc.location).exec(function(err,data){
			if(data.tours.indexOf(doc._id) === -1) {
				data.tours.push(doc);
			}
      data.save(function(err) {
        if(err)console.log(err);
        //console.log('end pre save txlog');
        //ret();
      });
    });
  }
});

Tour.relationship({ ref: 'Location', path: 'tours' });

Tour.defaultColumns = 'title, location|20%, type|20%, publishedDate|20%';
Tour.register();
