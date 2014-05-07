// var express = require('express');
// var router = express.Router();

/* GET home page. */
// router.get('/', function(req, res) {
//   res.render('index', { title: 'Express' });
// });

// module.exports = router;


exports.index = function(req, res) {
	console.log('index')
	res.render('index', { title: 'Card Collage' });
}

exports.simplecam = function(req, res) {
	console.log('picture')
	res.render('simplecam', { title: 'Simplecam' });
}

exports.picture = function(req, res) {
	console.log('picture')
	res.render('picture', { title: 'complex cam' });
}