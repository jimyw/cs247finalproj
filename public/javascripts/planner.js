// $(document).ready(function() {
function planner() {
	var finishTileClicked = 0;
	$("select").imagepicker();


	// create new collage  
	fb_collage_id = 'c'+Math.random().toString(36).substring(8);
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
	  	if (finishTileClicked == 0) {
		    // getting values from the form elements
		    direction = $("#directions").val();
		    recipient_name = $("#recipient_name").val();
		    templateType = $("#template_type").val();
		    var email = $("#email").val();
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
		    	finishTileClicked = 1;		// disable future clicks
		    	console.log(templateType);
			    console.log(direction);
			    console.log(recipient_name);
			    ga('send', 'event', 'submit', 'click', templateType);
			    // $("#task2-val").removeClass('error');

		    	// fb_new_collage.child('planner').set({
			    //   'direction': direction,
			    //   'templateType': templateType,
			    //   'recipient_name': recipient_name,
			    //   'recipient_id': recipient_id,
			    //   'admin_id': admin_id,
			    // }, initialize_collage);   // initialize collage on complete
				
				console.log(email)
				if (email) sendEmail(email);
				else createCollage();

		    }
		}
	  });
	// $("#directions").keyup(function(e) {
	// 	if ($("#directions").val()) {
	// 		$("#task2-val").removeClass('error');
	// 	}
	// })

	function createCollage() {
		console.log('createCollage');
		fb_new_collage.child('planner').set({
	      'direction': direction,
	      'templateType': templateType,
	      'recipient_name': recipient_name,
	      'recipient_id': recipient_id,
	      'admin_id': admin_id,
	    }, initialize_collage);   // initialize collage on complete
	}

	function sendEmail(receiver_email) {

		// setup e-mail data with unicode symbols
		var mailOptions = {
		    // to: "collagewithfriends@hotmail.com", // list of receivers
		    to: receiver_email,
		    subject: "CollageWithFriends: Your Collage", // Subject line
		    // text: "Hello world", // plaintext body
		    html: '<p>Hi! You have created a collage</p> <p></p> <p>You should keep this e-mail in case you want to edit the collage tiles or invite more participants later on.</p> <p>The link to invite participants for this collage is:<p> <p><a href="'+shareLink+'">'+shareLink+'</a></p> <p>Access this link to edit or delete tiles:</p> <p><a href="'+adminLink+'">Admin Link</a></p> <p>After the collage is complete, send this link to the intended recipient(s):</p> <p><a href="'+recipientLink+'">'+recipientLink+'</a></p>' // html body 
		}

		if (recipient_name) mailOptions.subject+=" for "+recipient_name;	// add recipient name if there is one

		$.ajax({
		  type: "POST",
		  url: "/postEmail",
		  data: mailOptions,
		  success: createCollage,
		});
	}
}



function GoToCollageID() {
	var id = $("#existing_collage").val();
	if (id) {
		window.location = '/?collage_id='+id;	
	}
}