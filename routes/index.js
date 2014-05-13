var Firebase = require('firebase');
var fb_link = "https://jjdcs247p4.firebaseio.com/Collage";


// get firebase tile instance
function getTileInstance(fb, fb_collage_id, fb_tile_id) {
	return fb.child(fb_collage_id).child('Tile').child(fb_tile_id);
}

// exports.birthday = function(req, res) {
// 	console.log('index')
// 	res.render('index', { title: 'Card Collage' });
// }

exports.index = function(req, res) {
	console.log('index');
	console.log(req.query);
	var post = req.query.post;
	if (!post) {
		post = 0;
	}

	console.log(post);
	var basic_data = { 
		title: 'Card Collage',  
		intromsg: "Jonathan's birthday is coming up soon. Choose a tile and upload a personal birthday wish for him!",
		message: "Happy birthday,",
		recipient_name: "Jonathan",
		name_collage: 1,		// handle name_collage in backend (based on what planner wants)
		post: post,
	};

	res.render('index', basic_data);
}

exports.simplecam = function(req, res) {
	console.log('simplecam')
	// Connect to firebase
	
	var fb = new Firebase(fb_link);
	var fb_collage_id = req.query.fb_collage_id;
	var fb_tile_id = req.query.fb_tile_id;
	var tile_instance = getTileInstance(fb, fb_collage_id, fb_tile_id);
	// var tile_instance = fb.child(fb_collage_id).child('Tile').child(fb_tile_id);

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

function onComplete() {
	res.redirect('/#'+params.fb_collage_id);
}

exports.postVideo = function (req, res) {
	console.log('postVideo');
	params = req.body;
	console.log(params);
	var fb = new Firebase(fb_link);
	var fb_collage_id = params.fb_collage_id;
	var fb_tile_id = params.fb_tile_id;
	// var audioURL = params.audio;
	// var videoURL = params.video;
	var text = params.textmsg;
	var tile_instance = getTileInstance(fb, fb_collage_id, fb_tile_id);
	var json_data = {text:text};	// audio: audioURL, video: videoURL, 

	// var render_data = JSON.parse( JSON.stringify(basic_data));	// make deep copy

	tile_instance.update(json_data, function() {
		// on complete
		res.redirect('/?collage_id='+params.fb_collage_id+'&post=1');
	});
}