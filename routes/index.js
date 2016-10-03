var express = require('express');
var router = express.Router();
var path = require('path');
var axios = require('axios');


/* GET home page. */
router.get('/', function(req, res) {
  var title = 'Demo Cloud App';

   res.render('index', {
     title: title
   });
});

module.exports = router;
