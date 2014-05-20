// handy functions
var video_audio_sync_time = 1000;	// ms

// append handlebars partial template
// e.g.
// var partial = '<td> <div class="wrapper tile" id="{{fb_tile_id}}"> <img src="{{photo}}" class="overlay"> <form accept-charset="UTF-8" action="non-exist" enctype="multipart/form-data" method="post"> </form> </div> </td>'; 
// var wrapper = '<div class="tile_list"> {{#each tile_list}} {{> tileItem}} {{/each}} </div> '; 
// var data1 = {tile_list:tile_list1};
// includeHandlebarsTemplate(partial, wrapper, "tileItem",  data1, "#row1")
function includeHandlebarsTemplate(partial, wrapper, inner_item, data, append_id) {
  Handlebars.registerPartial(inner_item,partial);
  var template = Handlebars.compile(wrapper); 
  var htmltext = template(data);
  // console.log(htmltext)
  $(append_id).html(htmltext);
}

// get firebase tile instance
function getTileInstance(fb, fb_collage_id, fb_tile_id) {
	return fb.child(fb_collage_id).child('Tile').child(fb_tile_id);
}

// update firebase with new tile
function updateTile(fb, fb_collage_id, fb_tile_id, json_data, onComplete) {
  console.log('updateTile');
  console.log(fb.child(fb_collage_id));
  var tile_instance = getTileInstance(fb, fb_collage_id, fb_tile_id);
  console.log(tile_instance);
  tile_instance.update(json_data, onComplete);
}

// function onComplete() {
// 	console.log('update complete')
// }

function getTilePhoto(fb, fb_collage_id, fb_tile_id) {
  console.log('getTilePhoto');
  var tile_instance = getTileInstance(fb, fb_collage_id, fb_tile_id) ;
  console.log(tile_instance);
  tile_instance.once('value', function(snap) {
  	console.log('tile_instance');
    var tile = snap.val();  // dictionary
    console.log(tile);
    if (tile.filled) {   // if tile is filled
      return {photo: tile.photo, default_photo: tile.default_photo};
    } else {
      return {photo: tile.default_photo, default_photo: tile.default_photo};
    }
  });
}


function datauri_to_blob(dataURI,callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', dataURI, true);
    xhr.responseType = 'blob';
    xhr.onload = function(e) {
      if (this.status == 200) {
        callback(this.response);
      }
    };
    xhr.send();
  }

  var blob_to_base64 = function(blob, callback) {
    var reader = new FileReader();
    reader.onload = function() {
      var dataUrl = reader.result;
      var base64 = dataUrl.split(',')[1];
      callback(base64);
    };
    reader.readAsDataURL(blob);
  };

  var base64_to_blob = function(base64) {
    var binary = atob(base64);
    var len = binary.length;
    var buffer = new ArrayBuffer(len);
    var view = new Uint8Array(buffer);
    for (var i = 0; i < len; i++) {
      view[i] = binary.charCodeAt(i);
    }
    var blob = new Blob([view]);
    return blob;
  };


function playVideo(tileId) {
  setTimeout(function(){
    document.getElementById("replay"+tileId).play();
    setTimeout(function(){
      document.getElementById("audio"+tileId).play(); // delay 500 seconds for audio, it worked well on my machine
    },0);
  },video_audio_sync_time); // wait until audio and video are both appended
}

// from http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}


// scroll to an anchor tag
// source: http://stackoverflow.com/questions/8579643/simple-jquery-scroll-to-anchor-up-or-down-the-page
function scrollToAnchor(aid){
    var aTag = $("a[name='"+ aid +"']");
    $('html,body').animate({scrollTop: aTag.offset().top},'slow');
}


