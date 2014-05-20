function showCam(e) {
	e.preventDefault();

	if (ready > 0) {

		var tileClicked = $(this);
		var old_id = tileClicked.attr('id');	// fb_tile_id
		fb_tile_id = old_id;

		tileClicked.attr('id', 'videowrapper');
		tileClicked.addClass('border');
		tileClicked.prepend('<video id="video"></video>')

		$("#picstartbutton").removeClass('hide_stuff');
		// $("#picdonebutton").removeClass('');
		// $("#piccancelbutton").removeClass('hide_stuff');

		var dir = 'Take a picture that matches the outlined shape. ';
		var counter_dir = 'Pressing the camera button will start a 10 second countdown before a picture is taken.';
		$("#task1").html(dir)
		simpleCam();
	}
	
}