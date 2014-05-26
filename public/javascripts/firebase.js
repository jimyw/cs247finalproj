// (function() {

$(document).ready(function(){
  // name_collage = $("#name_collage").html();
  // recipient_name = $("#recipient_name").html();
  // recipient_name = recipient_name.toUpperCase();
  initialize_page();
  checkIfGoogleChrome();
});

function checkIfGoogleChrome() {
  // please note, that IE11 now returns true for window.chrome
  var isChromium = window.chrome,
      vendorName = window.navigator.vendor;
  if(isChromium !== null && vendorName === "Google Inc.") {
     console.log(' is Google chrome ');
     return true;
  } else { 
     console.log(' not Google chrome ');
     $("#chrome_msg").removeClass('hide_stuff');
     return false;
  }
}

function initialize_page() {
  // var url_segments = document.location.href.split("/#");
  fb_collage_id = getParameterByName('collage_id');
  recipient_id = getParameterByName('recipient_id');
  isAdmin = $("#isAdmin").html();
  // console.log(url_segments);fb_tile_id
  if (fb_collage_id) {
    // fb_collage_id = url_segments[1];  // get collage_id from url
    console.log('Collage ID in url is ' + fb_collage_id);
    load_collage();
  } else {
    planner();
  }
}

function onSucess() {
  initialize_collage();
  
  console.log(recipient_name)
}

function initialize_collage() {
  var numTiles;
  var photoArray;

  // create simple design for M4
  // if (name_collage == 1) {
  //   numTiles = recipient_name.length;
  //   photoArray = new Array();
  //   for (var i=0; i<numTiles; i++) {
  //     photoArray.push(recipient_name[i]+'.jpg');
  //   }
  // } else {
    
    photoArray = photoDictionary[templateType];
    numTiles = photoArray.length;
  // }
  
  for (var i=0; i<numTiles; i++) {
    var _fb_tile_id = Math.random().toString(36).substring(7)
    var fb_new_tile = fb_new_collage.child('Tile').child(_fb_tile_id);  // create numTiles

    var j = i % (photoArray.length);
    console.log(photoArray[j])
    fb_new_tile.set({
      'name': '', 
      'email': '', 
      'photo':'/images/templates/'+photoArray[j],
      'default_photo':'/images/templates/'+photoArray[j],
      'video':'',
      'audio':'',
      'text':'',
      'filled': 0,
      'tile_index': i,
      'is_public': true,
    });

    console.log('initialize_collage, var='+i);
  }

  loadDirect = false;

  window.location = '/?collage_id='+fb_collage_id;    // redirect page
  // load_collage(numTiles);   
}

// returns the list of tiles for a given collage id as JSON
function load_collage(numTiles) {
  console.log('load_collage')
  var tile_list = new Array();

  var tile_instance = fb.child(fb_collage_id).child('Tile');
  console.log(tile_instance);
  tile_instance.on('value', function(tileIdSnap) {  // makes update to tile_list whenever changes happen

    if (loadDirect || tileIdSnap.numChildren() == numTiles) {
      tileIdSnap.forEach(function(childSnap) {  // loop through all the children and fill them into tile_list
        var val = childSnap.val();
        val.fb_tile_id = childSnap.name();
        val.fb_collage_id = fb_collage_id;
        val.isAdmin = isAdmin;
        console.log('admin='+val.isAdmin);

        if (val.audio) {  // convert back to blob
          console.log('audio');
          var audio_blob = base64_to_blob(val.audio);
          audio_blob.type = "audio/wav"; 
          val.audio = URL.createObjectURL(audio_blob);

          var video_blob = base64_to_blob(val.video);
          video_blob.type = "video/webm";
          val.video = URL.createObjectURL(video_blob);

          console.log(val.audio);
        }

        var tile_index = val.tile_index;
        tile_list[tile_index]=val;

        console.log(val.fb_tile_id)
        tile_dictionary[val.fb_tile_id] = val;
      });

      displayPage(tile_list);
    }
  });

  $("td").mouseover(function(e) {
    console.log('hover in');
  }, function(e) {
    console.log('hover out');  
  });

}

// returns true if tile is already filled (i.e. has valid photo)
function tileIsDone(_fb_tile_id) {
  var tile_instance = fb.child(fb_collage_id).child('Tile').child(_fb_tile_id);
  tile_instance.once('value', function(snap) {
    var tile = snap.val();  // dictionary
    console.log(tile);
    if (tile.filled) {   // if tile is filled
      return true;
    } else {
      return false;
    }
  })
}



function show(snap) {
   $('pre').text(JSON.stringify(snap.val(), null, 2));
}

function playTile() {
  console.log('tileListener');
  
  
    $(".tile").mouseenter(function(e) {
      var _fb_tile_id = $(this).attr("id");

      console.log(_fb_tile_id+' mouseenter');
      if (_fb_tile_id.indexOf('wrapper')>=0) {
        console.log('wrapper')
          _fb_tile_id= _fb_tile_id.substring(7); // removes 'wrapper'
      }

      if (_fb_tile_id.indexOf('photo')>=0) {
        console.log('photo')
          _fb_tile_id= _fb_tile_id.substring(5); // removes 'wrapper'
      }
      console.log(_fb_tile_id);

      var replay = document.getElementById("replay"+_fb_tile_id);
      if (replay) {
        replay.play();
        document.getElementById("audio"+_fb_tile_id).play();
      }
    });

  if (!recipient_id) {
    $(".tile").click(showCam);
  }
}

function renderTwoRowTemplates() {
  // Retrieve templates from template file
  var template = Collage.Templates["templates/tileList.handlebars"];
  Handlebars.registerPartial('tileItem', Collage.Templates["templates/tileItem.handlebars"]);
  $("#row1").html(template(data1));
  $("#row2").html(template(data2));

  playTile();   // bind listeners for clicking on tiles
  listenToEditAndTrash();   // bind listeners for edit and trash icons
}

function displayTwoRows(tile_list) {
  var numTiles = tile_list.length;
  console.log('displayTwoRows')
  var tile_list1 = new Array();
  var tile_list2 = new Array();

  // separate the tiles into top row and bottom row
  for (key in tile_list) {

    if (name_collage == 1) {  // for spelling out name
      if (key < numTiles/2) {
        tile_list1.push(tile_list[key]);
      } else {
        tile_list2.push(tile_list[key]);
      }
    } else {    // case where we go by columns first
      if (key % 2 == 0) {
        tile_list1.push(tile_list[key]);
      } else {
        tile_list2.push(tile_list[key]);
      }
    }
  }

  data1 = {tile_list:tile_list1};
  data2 = {tile_list:tile_list2};
  console.log(data1);
  renderTwoRowTemplates();


  // var partial = '<td> <div class="wrapper tile" id="{{fb_tile_id}}"> <a href="/simplecam?fb_collage_id={{fb_collage_id}}&fb_tile_id={{fb_tile_id}}"> {{#if filled}} <img src="{{photo}}" class="flipping"> {{else}} <img src="{{photo}}" class="overlay"> {{/if}} </a> </div> </td>';
  // var wrapper = '<div class="tile_list"> {{#each tile_list}} {{> tileItem}} {{/each}} </div> ';
  // includeHandlebarsTemplate(partial, wrapper, "tileItem",  data1, "#row1")
  // includeHandlebarsTemplate(partial, wrapper, "tileItem",  data2, "#row2")



}

function displayName(tile_list) {
  // Retrieve templates from template file
  var template = Collage.Templates["templates/tileList.handlebars"];
  Handlebars.registerPartial('tileItem', Collage.Templates["templates/tileItem.handlebars"]);
  var data = {tile_list:tile_list, name_collage:name_collage}
  $("#row1").html(template(data));
}

function displayPage(tile_list) {
  console.log('displayPage')
  console.log(tile_dictionary)
  $("#collage_loading_msg").addClass('hide_stuff');
  var numTiles = tile_list.length;
  // if (numTiles <= 2 && name_collage == 1) {
  //     displayName(tile_list);  
  // } else {

  displayTwoRows(tile_list);
  // }
}

function listenToEditAndTrash() {
  console.log('listenToEditAndTrash');
  console.log(finishedTileIDs.length);
  for (var i=0; i<finishedTileIDs.length; i++) {
    console.log('happened');
    $("#trash"+finishedTileIDs[i]).removeClass('hide_stuff');
  }

  var tile_id;
  $(".edit").click(function(e){
    console.log('edit');
    tile_id = $(this).attr('id').substring(4);
    console.log(tile_id);
  })

  $(".trash").click(function(e) {
    console.log('trash')
    tile_id = $(this).attr('id').substring(5);
    $('.trash-confirm-btn').attr('id','button'+tile_id);  // set id for trashing confirm button
    console.log(finishedTileIDs);
  })

  $(".trash-confirm-btn").click(function(e){
    console.log('button');
    console.log(finishedTileIDs);
    var _tile_id = $(this).attr('id').substring(6);
    // console.log(_tile_id);
    $('a.close-reveal-modal').trigger('click');
    resetTile(_tile_id);
  })
}


// function editTile() {
//   tileIsSelected = true;  // global variable to be set to false upon post
        
//   $("#piccancelbutton").removeClass('hide_stuff');
//   $("#finish_msg").addClass('hide_stuff');
//   scrollToAnchor('task1_bottom');

//   console.log(fb_tile_id);

//   tileClicked.prepend('<div class="border" id="videowrapper"> <video id="video" class="flipping tile-video"></video> <img src="'+val.default_photo+ '" width=320 id="overlay"> </div>')

//   $("#img_"+fb_tile_id).addClass('hide_stuff');

//   $("#picstartbutton").removeClass('hide_stuff');

//   // change directions
//   $("#task1_msg1").addClass('hide_stuff');
//   $("#task1_msg2").removeClass('hide_stuff');
//   simpleCam();
// }

function resetTile(tile_id) {
  console.log('resetTile');
  console.log(finishedTileIDs);
  var default_photo;
  var i = finishedTileIDs.indexOf(tile_id);
  getTileDefaultPhoto(fb,fb_collage_id, tile_id, proceed); // gets photos

  if (i>=0) {
    console.log('spliced')
    finishedTileIDs.splice(i,1);  // removes element at i
  } else {
    console.log('error: cannot find tile_id')
  }

  // get the default tile photo and proceed to reset
  function getTileDefaultPhoto(fb_db, collage_id, tile_id,successcallback) {
    console.log('getTileDefaultPhoto');
    console.log(tile_id);
    var tile_instance = getTileInstance(fb_db, collage_id, tile_id) ;
    console.log(tile_instance);
    tile_instance.once('value', function(snap) {
      console.log('tile_instance');
      var tile = snap.val();  // dictionary
      console.log(tile.default_photo);
      default_photo = tile.default_photo;
      successcallback();
    });
  }

  // proceed after getting the default_photo
  function proceed() {

    console.log('proceed')
    console.log(default_photo);
    var reset_data = {
      photo: default_photo,
      video: '',
      audio: '',
      text: '',
      filled: 0,
      is_public: true,
    }
    updateTile(fb,fb_collage_id, tile_id, reset_data, resetCallBack);
  }
}

function resetCallBack() {
  $(".trash-confirm-btn").attr('id','');  // reset the id
  reset(0);
}

// })();