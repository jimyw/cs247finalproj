$(document).ready(function() {
	$(".preview-tile").click(function(e) {
		e.preventDefault();
		console.log('hello')
		$(this).addClass('tile-selected');
	})
});