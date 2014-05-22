// (function() {



$(document).ready(function(){
  // name_collage = $("#name_collage").html();
  // recipient_name = $("#recipient_name").html();
  // recipient_name = recipient_name.toUpperCase();
  initialize_page();
});

function initialize_page() {
  // var url_segments = document.location.href.split("/#");
  fb_collage_id = getParameterByName('collage_id');
  // console.log(url_segments);fb_tile_id
  if (fb_collage_id) {
    // fb_collage_id = url_segments[1];  // get collage_id from url
    console.log('Collage ID in url is ' + fb_collage_id);
    load_collage();
  } else {
    set_new_collage();
    
  }
}

function set_new_collage() {
  // create new collage  
  fb_collage_id = Math.random().toString(36).substring(7);
  var shareLink = document.location.href+"?collage_id="+fb_collage_id;
  $("#shareLink").html("Share this url with your friends to collaborate: "+ shareLink);

  // making first tile
  $("#make_first_tile").click(function() {
    direction = $("#directions").val();
    recipient_name = $("#recipient_name").val();
    templateType = $("#template_type").val();

    console.log(templateType);
    console.log(direction);
    console.log(recipient_name);
    fb_new_collage = fb.child(fb_collage_id);  

    fb_new_collage.child('planner').set({
      'direction': direction,
      'templateType': templateType,
      'recipient_name': recipient_name,
    }, initialize_collage);   // initialize collage on complete
  });
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
  
    photoArray = ['Heart1.jpg','Heart2.jpg','Heart3.jpg','Heart4.jpg'];  
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
      'photo':'/images/'+photoArray[j],
      'default_photo':'/images/'+photoArray[j],
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
  // console.log($(".tile"));
  
  $(".tile").mouseenter(function(e) {
    var _fb_tile_id = $(this).attr("id");
    console.log(_fb_tile_id+' hovered');
    var replay = document.getElementById("replay"+_fb_tile_id);
    if (replay) {
      replay.play();
      document.getElementById("audio"+_fb_tile_id).play();
  }
  });

  $(".tile").click(showCam);

}

function renderTwoRowTemplates() {
  // Retrieve templates from template file
  var template = Collage.Templates["templates/tileList.handlebars"];
  Handlebars.registerPartial('tileItem', Collage.Templates["templates/tileItem.handlebars"]);
  $("#row1").html(template(data1));
  $("#row2").html(template(data2));

  playTile();
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


  // var partial = '<td> <div class="wrapper tile" id="{{fb_tile_id}}"> <a href="/simplecam?fb_collage_id={{fb_collage_id}}&fb_tile_id={{fb_tile_id}}"> {{#if filled}} <img src="{{photo}}" class="flip"> {{else}} <img src="{{photo}}" class="overlay"> {{/if}} </a> </div> </td>';
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
  var numTiles = tile_list.length;
  // if (numTiles <= 2 && name_collage == 1) {
  //     displayName(tile_list);  
  // } else {

  displayTwoRows(tile_list);
  // }
  

  



}


// })();