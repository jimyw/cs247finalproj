(function() {

  // Connect to firebase
  var fb_link = "https://jjdcs247p4.firebaseio.com/Collage";
  var fb = new Firebase(fb_link);
  var fb_collage_id = $("#fb_collage_id").html();
  var fb_tile_id = $("#fb_tile_id").html();
  var ready = 0;
  var filled = $("#fb_filled").html();
  
  var status = $("#status");
  // console.log(fb_tile_id);

  // var photo_json = getTilePhoto(fb, fb_collage_id, fb_tile_id);

  // setTimeout(function(){
  //   console.log(photo_json);
  //   $("#overlay").attr('src', photo_json.photo);
  // },3000);


  // var fb_tile_instance = fb.child(fb_collage_id).child('Tile').child(fb_tile_id);
  // console.log(fb_tile_instance)

  var streaming = false,
      video        = document.querySelector('#video'),
      cover        = document.querySelector('#cover'),
      canvas       = document.querySelector('#canvas'),
      photo        = document.querySelector('#photo'),
      startbutton  = document.querySelector('#startbutton'),
      donebutton  = document.querySelector('#donebutton'),
      countdown  = document.querySelector('#countdown'),
      width = 320,
      height = 0;

  var data = photo.getAttribute('src');

  navigator.getMedia = ( navigator.getUserMedia || 
                         navigator.webkitGetUserMedia ||
                         navigator.mozGetUserMedia ||
                         navigator.msGetUserMedia);

  navigator.getMedia(
    { 
      video: true, 
      audio: false 
    },
    function(stream) {

      ready += 1;
      console.log(ready);
      if (navigator.mozGetUserMedia) { 
        video.mozSrcObject = stream;
      } else {
        var vendorURL = window.URL || window.webkitURL;
        video.src = vendorURL.createObjectURL(stream);
      }
      video.play();
    },
    function(err) {
      console.log("An error occured! " + err);
    }
  );

  video.addEventListener('canplay', function(ev){
    if (!streaming) {
      height = video.videoHeight / (video.videoWidth/width);
      video.setAttribute('width', width);
      video.setAttribute('height', height);
      canvas.setAttribute('width', width);
      canvas.setAttribute('height', height);
      streaming = true;
    }
  }, false);

  function takepicture() {
    // setTimeout(takepicture(), 3000);
    $("#photo").addClass('flip');
    console.log('takepicture')
    canvas.width = width;
    canvas.height = height;
    canvas.getContext('2d').drawImage(video, 0, 0, width, height);
    data = canvas.toDataURL('image/png');
    console.log(fb_tile_id)
    photo.setAttribute('src', data);

    filled = 1;
    var json_data = {photo: data, filled: filled};
    updateTile(fb, fb_collage_id, fb_tile_id, json_data)
    startbutton.innerHTML="Retake photo";

  }

  function showCountDown() {
    $("#videowrapper").addClass("redborder");
    $("#videowrapper").removeClass("border");
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
      $("#videowrapper").addClass("border");
      $("#videowrapper").removeClass("redborder");
    }, 3100);
  }

  startbutton.addEventListener('click', function(ev){
  	ev.preventDefault();
    if (ready == 1) {
      // send google analytics
      ga('send', 'event', 'button', 'click', 'take photo');
      status.removeClass("yellow");
      status.addClass("msg");
      status.html("");

      showCountDown();
      setTimeout(takepicture, 3000);
    } else {
      status.html("You must first enable the webcam to take a picture.");
      status.addClass("yellow");
      status.removeClass("msg");
    }
  }, false);

  donebutton.addEventListener('click', function(ev){
    if (filled == 1) {
      ga('send', 'event', 'button', 'click', 'done photo');
      console.log("Done taking photo");
      $.ajax({
        url: '/personalmsg',
        type: 'get',
        success: function(response) {
          //Do Something
          window.location = "/personalmsg?fb_collage_id="+fb_collage_id+"&fb_tile_id="+fb_tile_id
          console.log('ajax get success')
        },
        error: function(xhr) {
          //Do Something to handle error
          console.log('ajax get error')
        }
      });
    } else {
      console.log(filled)
      status.html("You haven't taken a photo yet.")
      status.addClass("yellow");
      status.removeClass("msg");
    }
  }, false);

})();