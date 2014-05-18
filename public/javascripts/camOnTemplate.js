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
		$("#picdonebutton").removeClass('hide_stuff');
		$("#piccancelbutton").removeClass('hide_stuff');

		simpleCam();
	}
	
}