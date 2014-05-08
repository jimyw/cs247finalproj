var Firebase = require('firebase');



exports.index = function(req, res) {
	console.log('index')
	res.render('index', { title: 'Card Collage' });
}

exports.simplecam = function(req, res) {
	console.log('simplecam')
	// Connect to firebase
	var fb_link = "https://jjdcs247p4.firebaseio.com/Collage";
	var fb = new Firebase(fb_link);
	var fb_collage_id = req.query.fb_collage_id;
	var fb_tile_id = req.query.fb_tile_id;
	var tile_instance = fb.child(fb_collage_id).child('Tile').child(fb_tile_id);

	var res_data = { title: 'Simplecam', fb_collage_id: req.query.fb_collage_id, fb_tile_id: req.query.fb_tile_id };

	tile_instance.once('value', function(snap) {
	  	console.log('tile_instance');
	    var tile = snap.val();  // dictionary
	    console.log(tile);
	    res_data.filled = tile.filled;
	    if (tile.filled) {   // if tile is filled
	      res_data.photo = tile.photo;
	      res_data.default_photo = tile.default_photo;
	    } else {
	      res_data.photo = tile.default_photo;
	      res_data.default_photo = tile.default_photo;
	    }

	    res.render('simplecam', res_data);
	});

	
}

exports.picture = function(req, res) {
	console.log('picture')
	res.render('picture', { title: 'complex cam' });
}

exports.personalmsg = function(req, res) {
	console.log('personalmsg')
	console.log(req.query);
	res.render('personalmsg', { title: 'complex cam', fb_collage_id: req.query.fb_collage_id, fb_tile_id: req.query.fb_tile_id});
}