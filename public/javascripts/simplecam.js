(function() {

  // Connect to firebase
  var fb_link = "https://jjdcs247p4.firebaseio.com/Collage";
  var fb = new Firebase(fb_link);
  var fb_collage_id = $("#fb_collage_id").html();
  var fb_tile_id = $("#fb_tile_id").html();
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


    var json_data = {photo: data, filled: 1};
    updateTile(fb, fb_collage_id, fb_tile_id, json_data)


  }

  function showCountDown() {
    $("#videowrapper").addClass("redborder");
    $("#videowrapper").removeClass("border");
    countdown.innerHTML = "2";
    setTimeout(function(){
      countdown.innerHTML = "1";
    }, 1000);
    setTimeout(function(){
      countdown.innerHTML = "0";
    }, 2000);
    setTimeout(function(){
      countdown.innerHTML = "";
      $("#videowrapper").addClass("border");
      $("#videowrapper").removeClass("redborder");
    }, 2100);
  }

  startbutton.addEventListener('click', function(ev){
  	ev.preventDefault();

    // send google analytics
    ga('send', 'event', 'button', 'click', 'take photo');

    showCountDown();
    setTimeout(takepicture, 3000);
  }, false);

  // var tile_instance = fb.child(fb_collage_id).child('Tile').child(fb_tile_id);
  // tile_instance.onDisconnect().update({photo:data}, function(){
  //   console.log('update completed')
  // });

  // donebutton.addEventListener('click', function(ev){
  //   console.log("Done taking photo");
  //   var data = photo.getAttribute('src');
    
  //   console.log('json_data')
    

    // $.ajax({
    //   url: 'personalmsg',
    //   type: 'get',
    //   success: function(response) {
    //     //Do Something
    //     console.log('ajax get success')
    //   },
    //   error: function(xhr) {
    //     //Do Something to handle error
    //     console.log('ajax get error')
    //   }
    // })
  // }, false);

})();