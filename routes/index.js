var Firebase = require('firebase');
var fb_link = "https://jjdcs247p4.firebaseio.com/Collage";
var mailer = require('./mailer');	// returns a function. Send mail by mailer(mailOptions) and pass in mailOptions



// mailer(mailOptions);

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

exports.index = function(req, res) {
	console.log('index');
	console.log(req.query);
	var post = req.query.post;
	var fb_collage_id = req.query.c;
	var admin_id = req.query.a;
	var recipient_id = req.query.r;
	if (!post) {
		post = 0;
	}
	var direction, templateType, recipient_name;
	var faces = 0;
	var choice = 0;


	console.log(post);

if (fb_collage_id) {

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
			    console.log('faces');
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
		    	recipient: false,
		    	recipient_id: true_recipient_id,
		    	collage_id: fb_collage_id,
		    }

		    if (admin_id && true_admin_id == admin_id) {
		    		console.log('admin!')
		    		basic_data.admin = true;
		    		basic_data.admin_id = true_admin_id;
	    	}

		    if (recipient_id && true_recipient_id == recipient_id) {
		    	basic_data.recipient = true;
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
	var text = params.textmsg;
	var tile_instance = getTileInstance(fb, fb_collage_id, fb_tile_id);
	var json_data = {text:text};	// audio: audioURL, video: videoURL, 

	tile_instance.update(json_data, function() {
		// on complete
		res.redirect('/?c='+params.fb_collage_id+'&post=1');
	});
}

// sends email to Planner
exports.postEmail = function(req, res) {
	console.log('postEmail')
	var mailOptions = req.body;
	console.log('mailOptions')
	console.log(mailOptions)
	mailer(mailOptions);
	res.send(200);	// success
}

