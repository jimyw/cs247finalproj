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
function updateTile(fb, fb_collage_id, fb_tile_id, json_data) {
  console.log('updateTile');
  console.log(fb.child(fb_collage_id));
  var tile_instance = getTileInstance(fb, fb_collage_id, fb_tile_id);
  console.log(tile_instance);
  tile_instance.update(json_data, onComplete);
}

function onComplete() {
	console.log('update complete')
}

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