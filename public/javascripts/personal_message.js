// Initial code by Borui Wang, updated by Graham Roth
// For CS247, Spring 2014

function setUpVideo() {

  // record video
  // navigator.getMedia({video: true}, function(mediaStream) {
    console.log(video_stream_saved);
    $("#status").html("Please also enable microphone :)");
    window.recordRTC_Video = RecordRTC(video_stream_saved,{type:"video"});
    //Number of media ready
    // ready += 1;
    // if(ready == 2){
    //   $("#start_recording").show();
    // }
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
        src: URL.createObjectURL(video_stream_saved)
    });
    video.play();
    video.className = "not-recording";

    webcam_stream.appendChild(video);

  // },function(failure){
  //   console.log(failure);
  // });
}

function setUpAudio() {
  
  // record audio
  // navigator.getMedia({audio: true}, function(mediaStream) {
    $("#status").removeClass("yellow");
    $("#status").addClass("msg");
    $("#status").html("You can now start recording the video!");

    window.recordRTC_Audio = RecordRTC(audio_stream_saved,{type:"audio"});
    // ready += 1;
    // if(ready == 2){
    //   $("#start_recording").show();
    // }
  // },function(failure){
  //   console.log(failure);
  // });
}

(function() {

  // var fb_link = "https://jjdcs247p4.firebaseio.com/Collage";
  // var fb = new Firebase(fb_link);
  // var fb_collage_id;
  // var fb_tile_id;


  var cur_video_blob = null;
  // var fb_instance;
  var mediaRecorder;
  var filter_class = "none";
  // var ready = 0;

  var starttime;

  function record_audio_and_video(){
    starttime = new Date().getTime();

    $("#status").html("Audio and video recording started");

    recordRTC_Audio.startRecording();
    recordRTC_Video.startRecording();
  }



  function showCountDown() {
    console.log('showCountDown')
    // $("#btn_record").attr("src","/images/stop.jpg");
    $("#btn_record").hide();

    // $(".cropper").addClass("redborder");
    var countdown = $("#videocountdown")
    countdown.html("3");
    setTimeout(function(){
      countdown.html("2");
    }, 1000);
    setTimeout(function(){
      countdown.html("1");
    }, 2000);
    setTimeout(function(){
      countdown.html("0");
    }, 3000);
    setTimeout(function(){
      countdown.html("");
      // $("#btn_record").show();
      // $(".cropper").addClass("border");
      $("#start_recording").hide();
      $("#stop_recording").show();
      $("#stat_container").addClass("recording");
      $("#stat_container").removeClass("not-recording");      
    }, 3100);
  }
  
  $(document).ready(function() {
    $("input[name='my-checkbox']").bootstrapSwitch();
    $('input[name="my-checkbox"]').bootstrapSwitch('onText', '&nbsp&nbsp 3-sec Timer &nbsp');
    $('input[name="my-checkbox"]').bootstrapSwitch('offText', '10-sec Timer');
    $('input[name="my-checkbox"]').bootstrapSwitch('size', 'large');
    $('input[name="my-checkbox"]').bootstrapSwitch('offColor', 'warning');

    finishButtonListener();
    // picCancelButtonListener();

    $("#vidcancelbutton").click(function(e){
      e.preventDefault();

      if ($("#stat_container").hasClass("recording")) {
          // video stop recording
          recordRTC_Audio.stopRecording(function(audioURL) {
          });
          recordRTC_Video.stopRecording(function(videoURL) {
          });
      }
      // $("#vmsg").addClass('hide_stuff');
      $("#stat_container").removeClass("recording");
      $("#stat_container").addClass("not-recording");
      $("#stop_recording").hide();
      $("#start_recording").show();
      $("#btn_record").show();
      scrollToAnchor('task1');
    });

    $("#stop_recording").hide();
    $("#start_recording").show();
    $("#replay_recording").hide();
    // $("#finish").hide();

    //Start recording button touched
    $("#start_recording").click(function (e){
      e.preventDefault();  
      if(video_ready > 0 && audio_ready > 0){
        // send google analytics
        ga('send', 'event', 'button', 'click', 'take video');

        $("#replay_recording").hide();

        // Timer - take out
        // showCountDown();
        // setTimeout(record_audio_and_video,3000);

        record_audio_and_video();
        $("#start_recording").hide();
        $("#stop_recording").show();
        $("#stat_container").addClass("recording");
        $("#stat_container").removeClass("not-recording"); 

        $("#audio_link").html("");        
        $("#video_link").html("");
      }else{
        $("#status").html("Need to enable both microphone and camera to record a message :)");
        $("#status").addClass("yellow");
        $("#status").removeClass("msg");
      }
    });

    //Stop recording button touched
    $("#stop_recording").click(function (e){
      e.preventDefault();
      // $(".cropper").removeClass("redborder");
      // $("#btn_record").attr("src","/images/record.jpg");

      var textbox_text = $("#textbox").val();
      $("#stat_container").removeClass("recording");
      $("#stat_container").addClass("not-recording");


      recordRTC_Audio.stopRecording(function(audioURL) {
        $("#audio_link").append("<audio id='audio' src='"+audioURL+"'></audio>")
        $("#status").html("Video message recorded!");
        $("#status").removeClass("yellow");
        $("#status").addClass("msg");

        datauri_to_blob(audioURL,function(blob){
          blob_to_base64(blob,function(base64){
            json_data.audio = base64;
            console.log(json_data);
          });
        });
      });

      recordRTC_Video.stopRecording(function(videoURL) {
        $("#video_link").append("<video id='replay' class='flipping' src='"+videoURL+"'></video>")

        datauri_to_blob(videoURL,function(blob){
          blob_to_base64(blob,function(base64){
            console.log('conversion')
            json_data.video = base64;
            console.log(json_data);

          });
        });
      });

      playVideo('');

      $(this).hide();
      $("#btn_record").show();
      $("#start_recording").show();
      $("#replay_recording").show();
      $("#finish").removeClass('hide_stuff');
    });

    $("#replay_recording").click(function (){
      ga('send', 'event', 'button', 'click', 'replay video');
      playVideo('');
    });

  });

})();
