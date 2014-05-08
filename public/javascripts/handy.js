// handy functions


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

// update firebase with new tile
function updateTile(fb, fb_collage_id, fb_tile_id, json_data) {
  console.log('updateTile');
  var tile_instance = fb.child(fb_collage_id).child('Tile').child(fb_tile_id);
  tile_instance.update(json_data, onComplete);
}

function onComplete() {
	console.log('update complete')
}