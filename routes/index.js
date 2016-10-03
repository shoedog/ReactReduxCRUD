var express = require('express');
var router = express.Router();
var path = require('path');



/* GET home page. */
router.get('/', function(req, res) {
  var title = 'Demo Cloud App';
  var youTubeAPI = path.join('..', 'public', 'javascripts', 'youTubeAPI.js');

   res.render('index', {
     title: title,
     youTubeAPI: youTubeAPI
   });
});

module.exports = router;
