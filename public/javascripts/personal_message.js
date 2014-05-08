// Initial code by Borui Wang, updated by Graham Roth
// For CS247, Spring 2014

(function() {

  var cur_video_blob = null;
  var fb_instance;
  var mediaRecorder;
  var filter_class = "none";
  var ready = 0;

  function record_audio_and_video(){

    $("#status").html("Audio and video recording started");

    recordRTC_Audio.startRecording();
    recordRTC_Video.startRecording();
  }
  
  $(document).ready(function() {

    // record video
    navigator.getUserMedia({video: true}, function(mediaStream) {
      $("#status").html("waiting..");
      window.recordRTC_Video = RecordRTC(mediaStream,{type:"video"});
      //Number of media ready
      ready += 1;

      //Add a video indicator to the upper right corner
      var video_width= 160;
      var video_height= 120;
      var webcam_stream = document.getElementById('webcam_stream');
      var video = document.createElement('video');
      webcam_stream.innerHTML = "";
      // adds these properties to the video
      video = mergeProps(video, {
          controls: false,
          width: video_width,
          height: video_height,
          src: URL.createObjectURL(mediaStream)
      });
      video.play();
      video.className = "not-recording";

      webcam_stream.appendChild(video);

    },function(failure){
      console.log(failure);
    });

    // record audio
    navigator.getUserMedia({audio: true}, function(mediaStream) {
      $("#status").html("waiting..");
      window.recordRTC_Audio = RecordRTC(mediaStream,{type:"audio"});
      ready += 1;
    },function(failure){
      console.log(failure);
    });

    //Start recording button touched
    $("#start_recording").click(function (){   
      if(ready == 2){
        record_audio_and_video();
      }else{
        $("#status").html("Need to enable both microphone and camera to record a message");
      }
      $(this).remove();
    });

    //Stop recording button touched
    $("#stop_recording").click(function (){
      recordRTC_Audio.stopRecording(function(audioURL) {
        //$("#audio_link").append("<a href='"+audioURL+"'' target='_blank'>"+audioURL+"</a>")
        console.log(audioURL);
        $("#audio_link").append("<audio id='audio' src='"+audioURL+"'></audio>")
      });
      recordRTC_Video.stopRecording(function(videoURL) {
        $("#video_link").append("<video id='replay' src='"+videoURL+"'></video>")
      });

      setTimeout(function(){
        document.getElementById("replay").play();
        setTimeout(function(){
          document.getElementById("audio").play(); // delay 500 seconds for audio, it worked well on my machine
        },0);
      },1000); // wait until audio and video are both appended

      $(this).remove();
    });
  });

})();
