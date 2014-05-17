$(document).ready(function(){
	resize_section();

	$(window).on("resize", function(){ 
		resize_section();
	});

	$('.works li').hover(function(){
		$(this).find('.hover').fadeIn(100);
	}, function(){
		$(this).find('.hover').fadeOut(100);
	});
});

function resize_section(){
	var height = $(window).height();
	var width = $(window).width();
	var nav_height = $('.nav').height();

	//set the height of intro section and place the teaser in the right place
	$('#intro').css('height', height);
	$('.nav').css('top', height - nav_height);
	$('.nav_bg').css('height', nav_height);
	$('.nav_bg').css('top', height - nav_height);

	//resize the background images
	if($(window).width()>1000){
		$('.bg').css('background-size', '100% auto');
	}
	else{
		$('.bg').css('background-size', 'auto 100%');
	}

	//resize the background image of intro section
	if(height*14.0/9 < width){
		$('.bg').css('background-size', '100% auto');
	}
	else{
		$('.bg').css('background-size', 'auto 100%');
	}
}