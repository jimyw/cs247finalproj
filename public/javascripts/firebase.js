/* Include your Firebase link here!*/
var fb_link = "https://jjdcs247p4.firebaseio.com/Collage";
var fb = new Firebase(fb_link);
var numTiles = 12;
var fb_collage_id = 'jp20g3hxgvi';
var tile_list;
// var fb_tile_id = '14vuynqxgvi';


$(document).ready(function(){
  // initialize_collage();
  load_collage();
});

function initialize_collage() {
  // create new collage
  fb_collage_id = Math.random().toString(36).substring(7);
  console.log({m:"Share this url with your friend to collaborate: "+ document.location.origin+"/#"+fb_collage_id,c:"red"})

  var fb_new_collage = fb.child(fb_collage_id);
  for (var i=0; i<numTiles; i++) {
    var fb_tile_id = Math.random().toString(36).substring(7)
    var fb_new_tile = fb_new_collage.child('Tile').child(fb_tile_id);  // create numTiles

    fb_new_tile.set({
      'name': '', 
      'email': '', 
      'photo':'',
      'video':'',
      'text':''
    })
    // for every tile, there is a user and a stream
    // var fb_users = fb_new_tile.child('users'); 
    // var fb_stream = fb_new_tile.child('stream');
  }
}

// returns the list of tiles for a given collage id as JSON
function load_collage() {
  var tile_instance = fb.child(fb_collage_id).child('Tile');
  tile_instance.on('value', function(snap) {  // makes update to tile_list whenever changes happen
    tile_list = JSON.stringify(snap.val(), null, 2);
    // console.log(tile_list)
    show(snap);
    // return tile_list
  });
}

// returns true if tile is already filled (i.e. has valid photo)
function tileIsDone(fb_tile_id) {
  var tile_instance = fb.child(fb_collage_id).child('Tile').child(fb_tile_id);
  tile_instance.once('value', function(snap) {
    var tile = snap.val();  // dictionary
    if (tile.photo && tile.name) {   // if tile is filled
      return true;
    } else {
      return false;
    }
  })
}

function updateTile(fb_tile_id, json_data) {
  var tile_instance = fb.child(fb_collage_id).child('Tile').child(fb_tile_id);
  tile_instance.push(json_data);
}

function show(snap) {
   $('pre').text(JSON.stringify(snap.val(), null, 2));
}