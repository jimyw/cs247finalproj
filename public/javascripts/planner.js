$(document).ready(function() {
	$("select").imagepicker()
	$(".preview-tile").click(function(e) {
		e.preventDefault();
		console.log('hello')
		$(this).addClass('tile-selected');
	})
});