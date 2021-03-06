function showCam(e) {
	e.preventDefault();
	//console.log('showCam')
	//console.log('tileIsSelected: '+tileIsSelected)
	
	$("#picdonebutton").removeClass('disabled');
	if (!tileIsSelected) {
		//$("#picdonebutton").removeClass('hide_stuff');
		//console.log(tile_dictionary)

		var tileClicked = $(this);
		fb_tile_id = tileClicked.attr('id');	// fb_tile_id
		//console.log('id='+fb_tile_id);

		if (fb_tile_id.indexOf('wrapper')>=0) {
			fb_tile_id = fb_tile_id.substring(7);	// removes 'wrapper'
		}

		if (fb_tile_id.indexOf('photo')>=0) {
			fb_tile_id = fb_tile_id.substring(5);	// removes 'wrapper'
		}

		var val = tile_dictionary[fb_tile_id];	// get all the values of this tile
		console.log(fb_tile_id+ ' clicked');
		console.log(val.filled);

		// checks if tile is already filled
		if (val.filled == 0) {

			if (video_ready > 0) {

				if (audio_ready > 0) {
					$("#mic_alert").addClass('hide_stuff');
				}
			
				tileIsSelected = true;	// global variable to be set to false upon post
				
				$("#piccancelbutton").removeClass('hide_stuff');
				$("#finish_msg").addClass('hide_stuff');
				$("#picdonebutton").hide();

				scrollToAnchor('task1_bottom');

				console.log(fb_tile_id);

				tileClicked.prepend('<div class="border" id="videowrapper"> <video id="video" class="flipping tile-video"></video> <img src="'+val.default_photo+ '" width=320 id="overlay"> </div>')

				$("#img_"+fb_tile_id).addClass('hide_stuff');

				$("#picstartbutton").removeClass('hide_stuff');

				// change directions
				$("#task1_msg1").addClass('hide_stuff');
				$("#task1_msg2").removeClass('hide_stuff');
				simpleCam();
				$('#videowrapper').parent().addClass('border');

			} else {
				console.log('video_ready not')
				console.log(video_ready)
				if (video_clicked > 0) {
					getVideo();	
				}
			}
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
	        // json_data.is_public = $('#privacy_checkbox').is(":checked");	// check privacy setting (true for public, false for private)

			console.log('finishButtonListener');
			console.log('json_data');
			console.log(json_data);
			console.log('fb_collage_id='+fb_collage_id);
			console.log('fb_tile_id='+fb_tile_id);
			$("#finish_waiting").removeClass('hide_stuff');
			$("#finish").addClass('disabled');

			finishedTileIDs.push(fb_tile_id);	// update finishedTileIDs array

			updateTile(fb,fb_collage_id,fb_tile_id,json_data,onComplete);

		}
	});
}

function reset(completed) {

	// reset classes
	$("#picstartbutton").addClass('hide_stuff');
	$("#piccancelbutton").addClass('hide_stuff');
	$("#task1_msg2").addClass('hide_stuff');
	$("#task1_msg3").addClass('hide_stuff');
	//$("#picdonebutton").addClass('disabled');
	$("#picdonebutton").hide();
	$("#finish_waiting").addClass('hide_stuff');
	
	if (completed==1) {
		$("#vmsg").addClass('hide_stuff');
		$("#finish_msg").removeClass('hide_stuff');
		$("#direction").addClass('hide_stuff');
		//
		//$("#picdonebutton").addClass('hide_stuff');
	} else {
		$("#task1_msg1").removeClass('hide_stuff');
		$("#finish_msg").addClass('hide_stuff');

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