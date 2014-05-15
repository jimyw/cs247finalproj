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

var Jonathan_msg = "Jonathan's birthday is coming up soon. Choose a tile and upload a personal birthday wish for him!";
var grandma_msg = "Grandma Zoia's birthday is coming up soon. Choose a tile and upload a personal birthday wish for her!";
var ruth_msg = "Ruth is studying abroad. Choose a tile and tell her how you miss her!"
var ellen_msg = "Ellen's birthday is coming up soon. Choose a tile and upload a personal birthday wish for her!";
var messages = ["Happy birthday,", "Happy birthday,", "We miss you,", "Happy birthday,"];
var intromessages = [Jonathan_msg, grandma_msg, ruth_msg, ellen_msg];
var names = ["Jonathan", "Zoia", "Ruth", "Ellen"];
var collage_ids = ['5g6p65bqpvi','q6wq9z4cxr','l25y8ccjtt9', 'o366rpmn29', 'ryp2pt4kj4i','dmyjndvlsor','ps0wx5pzaor', '6c12imp9zfr'];
	// first 3 are name collages, second 3 are heart collages
// var collage_ids_hearts = [];

exports.index = function(req, res) {
	console.log('index');
	console.log(req.query);
	var post = req.query.post;
	var collage_id = req.query.collage_id;
	if (!post) {
		post = 0;
	}

	var name_collage = 0;
	
	// identify which collage:
	// in practice, we would search DB for collage_id
	var person = collage_ids.indexOf(collage_id);
	if (person > 2) {
		name_collage = 0;
		person = person % 4;	// get the right person
	} else if (person < 0) {
		person = 0;	// default
	}

	
	var message;
	
	if (name_collage == 1) {	// spell out name
		// if (collage_id == collage_ids[1]) {
		// 	person = 1;
		// } else if (collage_id == collage_ids[2]) {
		// 	person = 2;
		// }
		message = messages[person];
	} else {
		// if (collage_id == collage_ids_hearts[1]) {
		// 	person = 1;
		// } else if (collage_id == collage_ids_hearts[2]) {
		// 	person = 2;
		// }	
		message = messages[person] + ' '+names[person];
	}


	console.log(post);
	var basic_data = { 
		title: 'Card Collage',  
		intromsg: intromessages[person],
		message: message,
		recipient_name: names[person],
		name_collage: name_collage,		// handle name_collage in backend (based on what planner wants)
		post: post,
		fb_collage_id: collage_id,
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
