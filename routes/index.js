

function getTilePhoto(fb, fb_collage_id, fb_tile_id) {
  console.log('getTilePhoto');
  var tile_instance = getTileInstance(fb, fb_collage_id, fb_tile_id) ;
  console.log(tile_instance);
  tile_instance.once('value', function(snap) {
  	console.log('tile_instance');
    var tile = snap.val();  // dictionary
    console.log(tile);
    if (tile.filled) {   // if tile is filled
      return {photo: tile.photo, default_photo: tile.default_photo};
    } else {
      return {photo: tile.default_photo, default_photo: tile.default_photo};
    }
  });
}

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

	

	res.render('simplecam', { title: 'Simplecam', fb_collage_id: req.query.fb_collage_id, fb_tile_id: req.query.fb_tile_id });
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