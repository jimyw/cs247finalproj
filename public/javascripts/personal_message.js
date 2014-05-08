// Initial code by Borui Wang, updated by Graham Roth
// For CS247, Spring 2014

(function() {

  // var fb_link = "https://jjdcs247p4.firebaseio.com/Collage";
  // var fb = new Firebase(fb_link);
  // var fb_collage_id;
  // var fb_tile_id;


  var cur_video_blob = null;
  // var fb_instance;
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
      if(ready == 2){
        $("#start_recording").show();
      }
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
      if(ready == 2){
        $("#start_recording").show();
      }
    },function(failure){
      console.log(failure);
    });

    $("#stop_recording").hide();
    $("#start_recording").hide();

    //Start recording button touched
    $("#start_recording").click(function (){   
      if(ready == 2){
        // update ids here, because page loads too slowly
        // fb_collage_id = $("#fb_collage_id").html();
        // fb_tile_id = $("#fb_tile_id").html();
        // console.log(fb_tile_id);
        
        record_audio_and_video();

        $("#audio_link").html("");        
        $("#video_link").html("");
        $(this).hide();
        $("#stop_recording").show();
      }else{
        $("#status").html("Need to enable both microphone and camera to record a message");
      }
    });

    //Stop recording button touched
    $("#stop_recording").click(function (){
      var textbox_text = $("#textbox").val();
      recordRTC_Audio.stopRecording(function(audioURL) {
        //$("#audio_link").append("<a href='"+audioURL+"'' target='_blank'>"+audioURL+"</a>")
        // console.log('audio url '+audioURL);
        $("#audio_link").append("<audio id='audio' src='"+audioURL+"'></audio>")

        // updating firebase
        // var json_data = {audio: audioURL};
        // updateTile(fb, fb_collage_id, fb_tile_id, json_data)

        // update the form element
        $("#audio_form").val(audioURL);

      });

      recordRTC_Video.stopRecording(function(videoURL) {
        $("#video_link").append("<video id='replay' src='"+videoURL+"'></video>")

        // updating firebase
        // var json_data = {video: videoURL, text: textbox_text};
        // updateTile(fb, fb_collage_id, fb_tile_id, json_data)

        // update the form element
        $("#video_form").val(videoURL);

      });

      $("#finish").click(function (){ 
        
      }

      setTimeout(function(){
        document.getElementById("replay").play();
        setTimeout(function(){
          document.getElementById("audio").play(); // delay 500 seconds for audio, it worked well on my machine
        },0);
      },video_audio_sync_time); // wait until audio and video are both appended

      $(this).hide();
      $("#start_recording").html("Retake the Video");
      $("#start_recording").show();
    });
  });

})();
