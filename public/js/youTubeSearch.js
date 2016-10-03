//var Youtube = require('youtube-api');
var axios = require('axios');

/*
Youtube.authenticate({
  type: "oauth"
  , token: "AIzaSyBCzCHS7Txuaa2iO_8nu9sxkVnpojqFtBo"
});
*/
document.getElementById("youTubeSearch").addEventListener("click", searchYT);

function searchYT() {
  axios.get('https://www.googleapis.com/youtube/v3/', {
    params: {
      part: 'snippet',
      q: 'saturday night live'
    }
  }).then(function (data) {
    console.log(data);
  }).catch(function (error) {
    console.log(error);
  });
}


