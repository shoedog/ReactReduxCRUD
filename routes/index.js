var express = require('express');
var router = express.Router();
var path = require('path');
var axios = require('axios');


/* GET home page. */
router.get('/', function(req, res) {
   res.render('index');
});

module.exports = router;
