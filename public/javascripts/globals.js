/* Include your Firebase link here!*/
var fb_link = "https://jjdcs247p4.firebaseio.com/Collage";
var fb = new Firebase(fb_link);
var fb_collage_id = '';
var fb_new_collage; // FB instance of the new collage
var fb_tile_id = '';  
var loadDirect = true;
var templateType;
var recipient_name;
var direction;
var tileIsSelected = false;  // boolean for whether a tile has been clicked
var json_data = {filled: 0};

var name_collage = 1;
var tile_dictionary = {};

var video_ready = 0;
var audio_ready = 0;
var video_stream_saved;
var audio_stream_saved;

// two rows of data for collage
var data1;
var data2;