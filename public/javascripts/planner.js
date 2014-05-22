$(document).ready(function() {
	$("select").imagepicker();

	$(".preview-tile").parent().click(function(e) {
		e.preventDefault();
		if($(this).hasClass('selected') === true){
			$(this).children().eq(0).hide();
		}		
	});

	$(".preview-tile").parent().mouseover(function(e) {
		e.preventDefault();
		if($(this).hasClass('selected') === false){
			$(this).children().eq(0).show();
		}		
	});

	$(".preview-tile").parent().mouseout(function(e) {
		e.preventDefault();
		$(this).children().eq(0).hide();
	});
});