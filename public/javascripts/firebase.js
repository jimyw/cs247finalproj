(function() {

/* Include your Firebase link here!*/
var fb_link = "https://jjdcs247p4.firebaseio.com/Collage";
var fb = new Firebase(fb_link);
var fb_collage_id = 'zipycc5l8fr';
var fb_tile_id = '';  //oivqj6vfgvi
var loadDirect = true;

$(document).ready(function(){
  initialize_page();
  
});

function initialize_page() {
  var url_segments = document.location.href.split("/");
  if (url_segments[1]) {
    fb_collage_id = url_segments[1];  // get collage_id from url
    console.log('Collage ID in url is ' + fb_collage_id);
    load_collage();
  } else {
    initialize_collage();
  }
}

function initialize_collage() {
  // create simple design for M4
  var photoArray = ['photo1.jpg','photo2.jpg','photo3.jpg','photo4.jpg'];


  // create new collage
  var numTiles = 12;
  fb_collage_id = Math.random().toString(36).substring(7);
  console.log("Share this url with your friend to collaborate: "+ document.location.origin+"/#"+fb_collage_id)

  var fb_new_collage = fb.child(fb_collage_id);
  for (var i=0; i<numTiles; i++) {
    var fb_tile_id = Math.random().toString(36).substring(7)
    var fb_new_tile = fb_new_collage.child('Tile').child(fb_tile_id);  // create numTiles

    var j = i % (photoArray.length);

    fb_new_tile.set({
      'name': '', 
      'email': '', 
      'photo':'/images/'+photoArray[j],
      'video':'',
      'audio':'',
      'text':'',
      'filled': 0,
      'tile_index': i
    });

    console.log('initialize_collage, var='+i);
  }
  // if (i==numTiles) {
    loadDirect = false;
    load_collage(numTiles);  
  // }
  
}

// returns the list of tiles for a given collage id as JSON
function load_collage(numTiles) {
  console.log('load_collage')
  var tile_list = new Array();
  var iter=0;
  var tile_instance = fb.child(fb_collage_id).child('Tile');
  console.log(tile_instance);
  tile_instance.on('value', function(tileIdSnap) {  // makes update to tile_list whenever changes happen

    if (loadDirect || tileIdSnap.numChildren() == numTiles) {
      tileIdSnap.forEach(function(childSnap) {  // loop through all the children and fill them into tile_list
        var val = childSnap.val();
        val.fb_tile_id = childSnap.name();
        val.fb_collage_id = fb_collage_id;
        var tile_index = val.tile_index;
        tile_list[tile_index]=val;
        console.log(iter)
        iter+=1;
      });

      displayPage(tile_list);
    }
  });
}

// returns true if tile is already filled (i.e. has valid photo)
function tileIsDone(fb_tile_id) {
  var tile_instance = fb.child(fb_collage_id).child('Tile').child(fb_tile_id);
  tile_instance.once('value', function(snap) {
    var tile = snap.val();  // dictionary
    if (tile.filled) {   // if tile is filled
      return true;
    } else {
      return false;
    }
  })
}

function updateTile(fb_tile_id, json_data) {
  console.log('updateTile');
  var tile_instance = fb.child(fb_collage_id).child('Tile').child(fb_tile_id);
  tile_instance.set(json_data);
}

function show(snap) {
   $('pre').text(JSON.stringify(snap.val(), null, 2));
}

function tileListener() {
  console.log('tileListener')
  console.log($(".tile"))
  $(".tile").click(function(e) {
    fb_tile_id = $(this).attr("id");
    // get simplecam
    console.log(fb_tile_id);

    // $.ajax({
    //   url: 'simplecam',
    //   type: 'get',
    //   data: {fb_collage_id: fb_collage_id, fb_tile_id: fb_tile_id},
    //   success: function(response) {
    //     //Do Something
    //     console.log('ajax get success')
    //   },
    //   error: function(xhr) {
    //     //Do Something to handle error
    //     console.log('ajax get error')
    //   }
    // })


  });
}

function displayPage(tile_list) {
  console.log('displayPage')
  // console.log(tile_list);
  var numTiles = tile_list.length;

  var tile_list1 = new Array();
  var tile_list2 = new Array();

  // separate the tiles into top row and bottom row
  for (key in tile_list) {
    if (key % 2 == 0) {
      tile_list1.push(tile_list[key]);
    } else {
      tile_list2.push(tile_list[key]);
    }
  }

  // Retrieve templates from template file
  // var template = Collage.Templates["templates/tileList.handlebars"];
  // console.log(template);


  var partial = '<td> <div class="wrapper tile" id="{{fb_tile_id}}"> <a href="/simplecam?fb_collage_id={{fb_collage_id}}&fb_tile_id={{fb_tile_id}}"> <img src="{{photo}}" class="overlay"> </a> </div> </td>'; 
  var wrapper = '<div class="tile_list"> {{#each tile_list}} {{> tileItem}} {{/each}} </div> ';
  var data1 = {tile_list:tile_list1};
  includeHandlebarsTemplate(partial, wrapper, "tileItem",  data1, "#row1")
  var data2 = {tile_list:tile_list2};
  includeHandlebarsTemplate(partial, wrapper, "tileItem",  data2, "#row2")


  // tileListener();
}


})();