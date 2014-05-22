$(document).ready(function() {
	$("select").imagepicker();

	$(".preview-tile").parent().click(function(e) {
		e.preventDefault();
		if($(this).hasClass('selected') === true){
			$(this).children().eq(0).hide();
			$('#task2-text').html("Write instructions for the friends you will invite to collaborate on this collage.");
            $('#task2-text').css('color', '#555');
            $('#directions').html("");
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

	$('#choice-template').click(function(e){
        console.log("Choice clicked");
        if($(this).hasClass('selected') === true){
          $('#task2-text').html("You've chosen to make your own template, so write some instructions for your own collage tasks :)");
          $('#task2-text').css('color', 'purple');
          $('#directions').html("ex: Take a photo of scared face");
        }else{
          $('#task2-text').html("Write instructions for the friends you will invite to collaborate on this collage.");
          $('#task2-text').css('color', '#555');
          $('#directions').html("");
        }
    });
});