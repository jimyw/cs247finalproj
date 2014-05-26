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
var admin_id;
var recipient_id;
var isAdmin;

var name_collage = 1;
var tile_dictionary = {};

var video_ready = 0;
var audio_ready = 0;
var video_stream_saved;
var audio_stream_saved;
var video_clicked = 0;	// keeps track whether allow buttons have been pressed
var audio_clicked = 0;

var finishedTileIDs = new Array();	// keeps track of the tile ID that the current user finished
// var fb_tile_id_to_delete = '';

// two rows of data for collage
var data1;
var data2;

var photoDictionary = {
	'Heart': ['heart1.png','heart2.png','heart3.png', 'heart4.png'],
	'Circle': ['circle1.png','circle2.png','circle3.png', 'circle4.png'],
	'Square': ['square1.png','square2.png','square3.png', 'square4.png'],
	'Star': ['star1.png','star2.png','star3.png', 'star4.png'],
	'Faces': ['emotion1.png','emotion2.png','emotion3.png', 'emotion4.png'],
	'Choice': ['empty.png','empty.png','empty.png', 'empty.png'],
}

var clock;