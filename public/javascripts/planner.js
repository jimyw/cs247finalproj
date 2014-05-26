// $(document).ready(function() {
function planner() {
	$("select").imagepicker();


	// create new collage  
	fb_collage_id = Math.random().toString(36).substring(7);
	var shareLink = document.location.href+"?collage_id="+fb_collage_id;
	admin_id = Math.random().toString(36).substring(7);
	recipient_id = Math.random().toString(36).substring(7);
	var adminLink = shareLink+"&admin_id="+admin_id;
	var recipientLink = shareLink+"&recipient_id="+recipient_id;
	
	$("#shareLink").html(shareLink);
	$("#adminLink").html(adminLink);
	$("#recipientLink").html(recipientLink);

	// $("#shareLink").html('<a src="'+shareLink+'">'+shareLink+'</a>');
	// $("#adminLink").html('<a src="'+adminLink+'">'+adminLink+'</a>');
	// $("#recipientLink").html('<a src="'+recipientLink+'">'+recipientLink+'</a>');


	$(".preview-tile").parent().click(function(e) {
		e.preventDefault();
		if($(this).hasClass('selected') === true){
			$(this).children().eq(0).hide();
			$('#task2-text').html("Write instructions for the friends you will invite to collaborate on this collage.");
            $('#task2-text').css('color', '#555');
            $('#directions').attr('placeholder', "");
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
          $('#task2-text').html("You chose to describe a task instead of using a default template, so write the task for your friends:");
          $('#task2-text').css('color', 'purple');
          $('#directions').attr('placeholder', "Examples: Take a photo while making scary faces, Take a photo that communicates a shared memory with Ellie, etc.");
        }else{
          $('#task2-text').html("Write instructions for the friends you will invite to collaborate on this collage.");
          $('#task2-text').css('color', '#555');
          $('#directions').attr('placeholder', "");
        }
    });

    // making first tile
	  $("#make_first_tile").click(function() {
	    // getting values from the form elements
	    direction = $("#directions").val();
	    recipient_name = $("#recipient_name").val();
	    templateType = $("#template_type").val();
	    console.log('click')
	    fb_new_collage = fb.child(fb_collage_id); 

	    if (!recipient_name) {
	    	console.log('recipient_name empty')
	    	recipient_name = '';
	    }

	    // reset alerts
	    if (templateType) {
	    	$("#task1").css('color','');
	    }

	    // if (direction) {
	    // 	$("#task2-val").removeClass('error');
	    // }

	    if (!templateType) {
	    	// if (!templateType) {
	    		$("#task1").css('color','#C60F13');
	    		console.log('templateType empty')
	    	// } 
	    	// if (!direction) {
	    	// 	$("#task2-val").addClass('error')
	    	// 	console.log('direction empty')
	    	// }
	    } else {
	    	console.log(templateType);
		    console.log(direction);
		    console.log(recipient_name);
		    // $("#task2-val").removeClass('error');

	    	fb_new_collage.child('planner').set({
		      'direction': direction,
		      'templateType': templateType,
		      'recipient_name': recipient_name,
		      'recipient_id': recipient_id,
		      'admin_id': admin_id,
		    }, initialize_collage);   // initialize collage on complete
	    }
	  });
	// $("#directions").keyup(function(e) {
	// 	if ($("#directions").val()) {
	// 		$("#task2-val").removeClass('error');
	// 	}
	// })
}

function GoToCollageID() {
	var id = $("#existing_collage").val();
	if (id) {
		window.location = '/?collage_id='+id;	
	}
}