var Firebase = require('firebase');
var fb_link = "https://jjdcs247p4.firebaseio.com/Collage";


// check if instance exist
function checkFBExistance(fb_collage_id) {
	console.log('checkFBExistance '+fb_collage_id)
	fb.once('value', function(ss) {
		console.log(ss)
    if( ss.val() === null ) { 
    	console.log('false')
    	return false;
    } else { 
    	console.log('true')
    	return true;
    }

	});
}


// get firebase tile instance
function getTileInstance(fb, fb_collage_id, fb_tile_id) {
	return fb.child(fb_collage_id).child('Tile').child(fb_tile_id);
}


// exports.birthday = function(req, res) {
// 	console.log('index')
// 	res.render('index', { title: 'Card Collage' });
// }

// var Jonathan_msg = "Jonathan's birthday is coming up soon. Choose a tile and upload a personal birthday wish for him!";
// var grandma_msg = "Grandma Zoia's birthday is coming up soon. Choose a tile and upload a personal birthday wish for her!";
// var ruth_msg = "Ruth is studying abroad. Choose a tile and tell her how you miss her!"
// var ellen_msg = "Ellen's birthday is coming up soon. Choose a tile and upload a personal birthday wish for her!";
// var messages = ["Happy birthday,", "Happy birthday,", "We miss you,", "Happy birthday,"];
// var intromessages = [Jonathan_msg, grandma_msg, ruth_msg, ellen_msg];
// var names = ["Jonathan", "Zoia", "Ruth", "Ellen"];
// var collage_ids = ['5g6p65bqpvi','q6wq9z4cxr','l25y8ccjtt9', 'o366rpmn29', 'ryp2pt4kj4i','dmyjndvlsor','ps0wx5pzaor', '6c12imp9zfr'];
	// first 3 are name collages, second 3 are heart collages
// var collage_ids_hearts = [];

exports.index = function(req, res) {
	console.log('index');
	console.log(req.query);
	var post = req.query.post;
	var fb_collage_id = req.query.collage_id;
	var admin_id = req.query.admin_id;
	var recipient_id = req.query.recipient_id;
	if (!post) {
		post = 0;
	}
	var direction, templateType, recipient_name;
	var faces = 0;
	var choice = 0;

	// identify which collage:
	// var name_collage = 0;
	// in practice, we would search DB for collage_id
	// var person = collage_ids.indexOf(collage_id);
	// if (person > 2) {
	// 	name_collage = 0;
	// 	person = person % 4;	// get the right person
	// } else if (person < 0) {
	// 	person = 0;	// default
	// }

	// var message;
	// if (name_collage == 1) {	// spell out name
	// 	message = messages[person];
	// } else {
	// 	message = messages[person] + ' '+names[person];
	// }

	console.log(post);
	// var basic_data = { 
	// 	title: 'Card Collage',  
	// 	intromsg: intromessages[person],
	// 	message: message,
	// 	recipient_name: names[person],
	// 	name_collage: name_collage,		// handle name_collage in backend (based on what planner wants)
	// 	post: post,
	// 	fb_collage_id: collage_id,
	// };

if (fb_collage_id) {
	// if (checkFBExistance(fb_collage_id)) {

	  console.log('collage_id')

	  var fb = new Firebase(fb_link);
	  fb.child(fb_collage_id).child('planner').once('value', function(plannerSnap) {
	    var val = plannerSnap.val();
	    console.log(val)

	    // checks if this fb_collage_id exists
	    if (val == null) {
	    	console.log('error')
	    	res.render('error', {fb_collage_id: fb_collage_id});
	    } else {
	    	direction = val.direction;
		    templateType = val.templateType;
		    
		    recipient_name = val.recipient_name;
		    console.log(direction)
		    console.log(recipient_name)
		    console.log(templateType)

		    var true_recipient_id = val.recipient_id;
		    var true_admin_id = val.admin_id;

		    console.log("true_admin_id "+true_admin_id +" while admin_id="+admin_id);
		    console.log("true_recipient_id "+true_recipient_id)

		    if (templateType == 'Faces') {
			    console.log('faces')
			    faces = 1;
			}
			if (templateType == 'Choice') {
			    choice = 1;
			}

		    var basic_data = {
		    	direction: direction,
		    	templateType: templateType,
		    	recipient_name: recipient_name,
		    	faces: faces,
		    	choice: choice,
		    	admin: false,
		    }
		    if (admin_id && true_admin_id == admin_id) {
		    		console.log('admin!')
		    		basic_data.admin = true;
	    	}


		    if (recipient_id) {
		    	res.render('recipient', basic_data);
		    } else {
	    		res.render('index', basic_data);
		    }
	    }

	    
	  });
} else {
	res.render('new');
}
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
