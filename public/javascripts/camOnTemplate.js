function showCam(e) {
	e.preventDefault();
	console.log('showCam')
	console.log('tileIsSelected: '+tileIsSelected)
	if (!tileIsSelected) {
		$("#picdonebutton").removeClass('hide_stuff');
		if (video_ready > 0) {
			
			console.log(tile_dictionary)
			var tileClicked = $(this);
			fb_tile_id = tileClicked.attr('id');	// fb_tile_id
			console.log('id='+fb_tile_id);

			if (fb_tile_id.indexOf('wrapper')>=0) {
				fb_tile_id = fb_tile_id.substring(7);	// removes 'wrapper'
			}

			if (fb_tile_id.indexOf('photo')>=0) {
				fb_tile_id = fb_tile_id.substring(5);	// removes 'wrapper'
			}

			var val = tile_dictionary[fb_tile_id];	// get all the 		values of this tile
			console.log(fb_tile_id+ ' clicked');

			if (audio_ready > 0) {
				$("#mic_alert").addClass('hide_stuff');
			}

			console.log(val);
			if (val.filled == 0) {
				tileIsSelected = true;	// global variable to be set to false upon post
				
				$("#piccancelbutton").removeClass('hide_stuff');
				$("#finish_msg").addClass('hide_stuff');
				scrollToAnchor('task1_bottom');

				console.log(fb_tile_id);

				tileClicked.prepend('<div class="border" id="videowrapper"> <video id="video" class="flipping tile-video"></video> <img src="'+val.default_photo+ '" width=320 id="overlay"> </div>')

				$("#img_"+fb_tile_id).addClass('hide_stuff');
				
				// fb_tile_id = old_id;

				// tileClicked.attr('id', 'videowrapper');
				// tileClicked.addClass('border');
				// tileClicked.prepend('<video id="video"></video>')

				$("#picstartbutton").removeClass('hide_stuff');
				// $("#picdonebutton").removeClass('');
				// $("#piccancelbutton").removeClass('hide_stuff');

				// change directions
				// var dir = 'Take a picture that matches the outlined shape. ';
				// var counter_dir = 'Pressing the camera button will start a 10 second countdown before a picture is taken.';
				// $("#task1").html(dir)
				$("#task1_msg1").addClass('hide_stuff');
				$("#task1_msg2").removeClass('hide_stuff');
				simpleCam();
			}
		} else {
			console.log('video_ready not')
			console.log(video_ready)
			getVideo();
		}
	}
}

function picCancelButtonListener() {
	$("#piccancelbutton").click(function(e){
		e.preventDefault();

		// json_data = {name: ''};
		// updateTile(fb,fb_collage_id,fb_tile_id,json_data, onBack);
		renderTwoRowTemplates();
		reset(0);
	});
}

// listens to final finish button and updates tile
function finishButtonListener() {
	$("#finish").click(function(e) {
		e.preventDefault();
		if (!$(this).hasClass('disabled')) {
	        json_data.filled = 1;
	        json_data.is_public = $('#privacy_checkbox').is(":checked");	// check privacy setting (true for public, false for private)

			console.log('finishButtonListener');
			console.log('json_data');
			console.log(json_data);
			console.log('fb_collage_id='+fb_collage_id);
			console.log('fb_tile_id='+fb_tile_id);
			$("#finish_waiting").removeClass('hide_stuff');
			$("#finish").addClass('disabled');

			updateTile(fb,fb_collage_id,fb_tile_id,json_data,onComplete);

		}
	});
}

function reset(completed) {

	// reset classes
	$("#picstartbutton").addClass('hide_stuff');
	$("#piccancelbutton").addClass('hide_stuff');
	$("#task1_msg2").addClass('hide_stuff');
	$("#picdonebutton").addClass('disabled');
	$("#finish_waiting").addClass('hide_stuff');
	
	if (completed==1) {
		$("#vmsg").addClass('hide_stuff');
		$("#finish_msg").removeClass('hide_stuff');
		$("#direction").addClass('hide_stuff');
		$("#picdonebutton").addClass('hide_stuff');
	} else {
		$("#task1_msg1").removeClass('hide_stuff');

		// removes video cam:
		// $("#videowrapper").remove();
		// $("#img_"+fb_tile_id).removeClass('hide_stuff');
	}

	// reset variables
	fb_tile_id = '';  
	loadDirect = true;
	tileIsSelected = false;  // boolean for whether a tile has been clicked
	json_data = {filled: 0};
}

function onComplete() {
	scrollToAnchor('task1')
	reset(1);
	console.log('update complete');
}

function onBack() {
	reset(0);
	console.log('reset complete')
}