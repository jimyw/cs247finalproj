// Initial code by Borui Wang, updated by Graham Roth
// For CS247, Spring 2014

(function() {

  var fb_link = "https://jjdcs247p4.firebaseio.com/Collage";
  var fb = new Firebase(fb_link);
  var fb_collage_id;
  var fb_tile_id;


  var cur_video_blob = null;
  // var fb_instance;
  var mediaRecorder;
  var filter_class = "none";
  var ready = 0;

  var starttime;

  function record_audio_and_video(){
    starttime = new Date().getTime();

    $("#status").html("Audio and video recording started");

    recordRTC_Audio.startRecording();
    recordRTC_Video.startRecording();
  }

  function showCountDown() {
    console.log('showCountDown')
    $("#btn_record").attr("src","/images/stop.jpg");
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
      $("#btn_record").show();
      $('#stop_recording').show();
      // $(".cropper").addClass("border");
      $("#start_recording").hide();
      $("#stop_recording").show();
      $("#stat_container").addClass("recording");
      $("#stat_container").removeClass("not-recording");      
    }, 3100);
  }
  
  $(document).ready(function() {
    $("input[name='my-checkbox']").bootstrapSwitch();
    $('input[name="my-checkbox"]').bootstrapSwitch('onText', 'Public');
    $('input[name="my-checkbox"]').bootstrapSwitch('offText', 'Private');
    $('input[name="my-checkbox"]').bootstrapSwitch('size', 'large');
    $('input[name="my-checkbox"]').bootstrapSwitch('offColor', 'warning');
    // record video
    navigator.getUserMedia({video: true}, function(mediaStream) {
      $("#status").html("Please also enable microphone :)");
      window.recordRTC_Video = RecordRTC(mediaStream,{type:"video"});
      //Number of media ready
      ready += 1;
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
      $("#status").removeClass("yellow");
      $("#status").addClass("msg");
      $("#status").html("You can now start recording the video!");

      window.recordRTC_Audio = RecordRTC(mediaStream,{type:"audio"});
      ready += 1;
      // if(ready == 2){
      //   $("#start_recording").show();
      // }
    },function(failure){
      console.log(failure);
    });

    $("#stop_recording").hide();
    $("#start_recording").show();
    $("#replay_recording").hide();
    $("#finish").hide();

    //Start recording button touched
    $("#start_recording").click(function (){  
      if(ready == 2){
        // send google analytics
        ga('send', 'event', 'button', 'click', 'take video');

        //$("#stop_recording").css("background-color", "red")

        $("#replay_recording").hide();
        // update ids here, because page loads too slowly
        fb_collage_id = $("#fb_collage_id").html();
        fb_tile_id = $("#fb_tile_id").html();
        // console.log(fb_tile_id);

        showCountDown();
        setTimeout(record_audio_and_video,3000);
        // record_audio_and_video();

        $("#audio_link").html("");        
        $("#video_link").html("");
      }else{
        $("#status").html("Need to enable both microphone and camera to record a message :)");
        $("#status").addClass("yellow");
        $("#status").removeClass("msg");
      }
    });

    //Stop recording button touched
    $("#stop_recording").click(function (){
      // $(".cropper").removeClass("redborder");
      $("#btn_record").attr("src","/images/record.jpg");

      //$(this).css("background-color", "orange")
      var textbox_text = $("#textbox").val();
      $("#stat_container").removeClass("recording");
      $("#stat_container").addClass("not-recording");
      recordRTC_Audio.stopRecording(function(audioURL) {
        //$("#audio_link").append("<a href='"+audioURL+"'' target='_blank'>"+audioURL+"</a>")
        // console.log('audio url '+audioURL);

        $("#audio_link").append("<audio id='audio' src='"+audioURL+"'></audio>")
        $("#status").html("Video message recorded!");
        $("#status").removeClass("yellow");
        $("#status").addClass("msg");


        // updating firebase
        datauri_to_blob(audioURL,function(blob){
          blob_to_base64(blob,function(base64){
            var json_data = {audio: base64};
            updateTile(fb, fb_collage_id, fb_tile_id, json_data)
            // $("#video_form").val(base64);
            // console.log(base64);

            // var converteddata = URL.createObjectURL(base64_to_blob(base64))
            // $("#audio_link").append("<audio id='audio' src='"+converteddata+"'></audio>")


          });
        });


        // var json_data = {audio: audioURL};
        // updateTile(fb, fb_collage_id, fb_tile_id, json_data)

        // update the form element
        // datauri_to_blob(audioURL,function(blob){
        //   blob_to_base64(blob,function(base64){
        //     $("#audio_form").val(base64);
        //     //console.log(base64);
        //   });
        // });

        

      });

      recordRTC_Video.stopRecording(function(videoURL) {
        $("#video_link").append("<video id='replay' src='"+videoURL+"'></video>")

        // updating firebase
        datauri_to_blob(videoURL,function(blob){
          blob_to_base64(blob,function(base64){
            console.log('conversion')
            var json_data = {video: base64};
            updateTile(fb, fb_collage_id, fb_tile_id, json_data)
            // $("#video_form").val(base64);
            // console.log(base64);

            // var converteddata = URL.createObjectURL(base64_to_blob(base64))
            // $("#video_link").append("<video id='replay' src='"+converteddata+"'></video>")
            // console.log(videoURL);
            // console.log(converteddata);
          });
        });

        // var json_data = {video: videoURL, text: textbox_text};
        // updateTile(fb, fb_collage_id, fb_tile_id, json_data)

        // update the form element
        // datauri_to_blob(videoURL,function(blob){
        //   blob_to_base64(blob,function(base64){
        //     console.log('conversion')
        //     $("#video_form").val(base64);
        //     console.log(base64);
        //   });
        // });


        // $("#video_form").val(videoURL);

      });

      playVideo('');

      $(this).hide();
      //$("#start_recording").html("Retake the Video");
      $("#start_recording").show();
      $("#replay_recording").show();
      $("#finish").show();
    });

    $("#replay_recording").click(function (){
      ga('send', 'event', 'button', 'click', 'replay video');
      playVideo('');
    });

  });

})();
