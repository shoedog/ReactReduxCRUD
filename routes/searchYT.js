var path = require('path');
var axios = require('axios');


/* GET home page. */
var searchYT = axios.get('https://www.googleapis.com/youtube/v3/', {
    params: {
      part: 'snippet',
      q: 'saturday night live'
    }
  }).then(function (data) {
    console.log(data);
  }).catch(function (error) {
    console.log(error);
});


module.exports = searchYT;

