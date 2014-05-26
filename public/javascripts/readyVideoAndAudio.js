// readies both video and audio permissions



navigator.getMedia = ( navigator.getUserMedia || 
                       navigator.webkitGetUserMedia ||
                       navigator.mozGetUserMedia ||
                       navigator.msGetUserMedia);
console.log(navigator.getMedia);

getVideo();
getAudio();
function getVideo() {
  navigator.getMedia(
      { 
        video: true, 
        audio: false 
      },
      function(stream) {
        video_ready += 1;
        video_clicked += 1;
        $("#webcam_alert").addClass("hide_stuff");
        // $("#mic_alert").removeClass("hide_stuff");
        video_stream_saved = stream;
        console.log('video_ready');
        // if (navigator.mozGetUserMedia) { 
        //   video.mozSrcObject = stream;
        // } else {
        //   var vendorURL = window.URL || window.webkitURL;
        //   video.src = vendorURL.createObjectURL(stream);
        // }
        // video.play();
        setUpVideo(); // in personalmsg
      },
      function(err) {
        video_clicked += 1;
        console.log("An error occured! " + err);
      }
  );
}

function getAudio() {
  navigator.getMedia({audio: true}, function(mediaStream) {
    audio_ready += 1;
    audio_clicked += 1;
    $("#mic_alert").addClass("hide_stuff");
    audio_stream_saved = mediaStream;
    setUpAudio(); // in personalmsg
    },function(failure){
        audio_clicked += 1;
        console.log(failure);
  });
}