// passes the JQuery object of the tile Clicked
function simpleCam() {
  var td_height = $("td").height();
  var td_width = $("td").width();

// (function() {

  // Connect to firebase
  // var fb_link = "https://jjdcs247p4.firebaseio.com/Collage";
  // var fb = new Firebase(fb_link);
  // var fb_collage_id = $("#fb_collage_id").html();
  // var fb_tile_id = $("#fb_tile_id").html();
  
  // var filled = $("#fb_filled").html();
  var status = $("#status");
  // console.log(fb_tile_id);
  console.log(video_stream_saved);
  

  // var fb_tile_instance = fb.child(fb_collage_id).child('Tile').child(fb_tile_id);
  // console.log(fb_tile_instance)

  var streaming = false,
      video        = document.querySelector('#video'),
      cover        = document.querySelector('#cover'),
      canvas       = document.querySelector('#canvas'),
      // photo        = document.querySelector('#photo'),
      // photo        = document.querySelector('#img_'+fb_tile_id),
      photo = $("#img_"+fb_tile_id);
      videowrapper = $("#videowrapper");
      startbutton  = document.querySelector('#camera_icon'),
      donebutton = $("#picdonebutton");
      // donebutton  = document.querySelector('#picdonebutton'),
      countdown  = document.querySelector('#countdown'),
      // width = 320,
      // height = 0;
      width = td_width;
      height = td_height;

  var data;

  // playing the video
  if (navigator.mozGetUserMedia) { 
    video.mozSrcObject = video_stream_saved;
  } else {
    var vendorURL = window.URL || window.webkitURL;
    video.src = vendorURL.createObjectURL(video_stream_saved);
  }
  video.play();

  

  video.addEventListener('canplay', function(ev){
    if (!streaming) {
      // height = video.videoHeight / (video.videoWidth/width);
      video.setAttribute('width', width);
      video.setAttribute('height', height);
      canvas.setAttribute('width', width);
      canvas.setAttribute('height', height);
      streaming = true;
    }
  }, false);

  function takepicture() {
    $("#"+fb_tile_id).removeClass('picrecording');

      $("#photo").addClass('flipping');
      console.log('takepicture')
      canvas.width = width;
      canvas.height = height;
      canvas.getContext('2d').drawImage(video, 0, 0, width, height);
      data = canvas.toDataURL('image/png');
      console.log(fb_tile_id);
      photo.attr('src', data);
      photo.addClass('flipping');
      photo.addClass('stretch');

      console.log(json_data);
      json_data.photo = data;   // update photo data
      console.log(json_data);
      // updateTile(fb, fb_collage_id, fb_tile_id, json_data)
      

      photo.removeClass('hide_stuff');
      photo.removeClass('overlay');
      videowrapper.addClass('hide_stuff');
      $('#videowrapper').parent().removeClass('border');
      //donebutton.removeClass('disabled');
      donebutton.show();
      $("#task1_msg2").addClass('hide_stuff');
      $("#task1_msg3").removeClass('hide_stuff');
      // donebutton.className = "next";  // removes 'disabled'
  }

  function showCountDown() {




    videowrapper.addClass("redborder");
    videowrapper.removeClass("border");
    countdown.innerHTML = "3";
    setTimeout(function(){
      countdown.innerHTML = "2";
    }, 1000);
    setTimeout(function(){
      countdown.innerHTML = "1";
    }, 2000);
    setTimeout(function(){
      countdown.innerHTML = "0";
    }, 3000);
    setTimeout(function(){
      countdown.innerHTML = "";
      videowrapper.addClass("border");
      videowrapper.removeClass("redborder");
    }, 3100);
  }

  startbutton.addEventListener('click', function(ev){
  	ev.preventDefault();
    if (video_ready > 0) {
      // send google analytics
      ga('send', 'event', 'button', 'click', 'take photo');
      status.removeClass("yellow");
      status.addClass("msg");
      status.html("");

      photo.addClass('hide_stuff');
      videowrapper.removeClass('hide_stuff');

      // 3 second timer
      clock.setTime(3);

      $("#"+fb_tile_id).addClass('picrecording');


      clock.start(function() {
      // this (optional) callback will fire each time the clock flips
      });
      setTimeout(takepicture, 5000);  // flipclock has 2 sec lag


      // if ($('#timer-checkbox').is(":checked")) {
      // } else {
      //   // 10 second timer
      //   showCountDown();
        
      // }
    } else {
      status.html("Enable the webcam to take a picture :)");
      status.addClass("yellow");
      status.removeClass("msg");
    }
  }, false);



  donebutton.click(function(ev){
    // if (filled == 1) {
      if (!donebutton.hasClass('disabled')) {
        $("#vmsg").removeClass('hide_stuff');
        // ga('send', 'event', 'button', 'click', 'done photo');
        //console.log("Done taking photo");


        

       scrollToAnchor('vmsg');

       $('#webcam_stream').children().eq(0).addClass('flipping');


        // $.ajax({
        //   url: '/personalmsg',
        //   type: 'get',
        //   success: function(response) {
        //     //Do Something
        //     // window.location = "/personalmsg?fb_collage_id="+fb_collage_id+"&fb_tile_id="+fb_tile_id
        //     console.log('ajax get success')
        //   },
        //   error: function(xhr) {
        //     //Do Something to handle error
        //     console.log('ajax get error')
        //   }
        // });




      // } else {
      //   console.log(filled)
      //   status.html("You haven't taken a photo yet.")
      //   status.addClass("yellow");
      //   status.removeClass("msg");
      // }
    }
  });

}
// })();