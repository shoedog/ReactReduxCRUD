// Include the cluster module
var cluster = require('cluster');

// Code to run if we're in the master process
if (cluster.isMaster) {

    // Count the machine's CPUs
    var cpuCount = require('os').cpus().length;

    // Create a worker for each CPU
    for (var i = 0; i < cpuCount; i += 1) {
        cluster.fork();
    }

    // Listen for terminating workers
    cluster.on('exit', function (worker) {

        // Replace the terminated workers
        console.log('Worker ' + worker.id + ' died :(');
        cluster.fork();

    });

// Code to run if we're in a worker process
} else {
    var AWS = require('aws-sdk');
    var express = require('express');
    var bodyParser = require('body-parser');
    var path = require('path');
    var compression = require('compression');
    var uuid = require('uuid');

    AWS.config.region = process.env.REGION;
  /*AWS.config.update({
    region: "us-west-2",
    endpoint: "http://localhost:8000"
  });*/

  //var ddb = new AWS.DynamoDB();
  //ddb.setEndpoint("http://localhost:8000");
  //var table = "Songs";
    var ddb = new AWS.DynamoDB({region: 'us-west-2'});
    var ddbTable =  process.env.STARTUP_SONGS_TABLE;

    const songs = {};

    var app = express();
    app.use(express.static('public'));
    app.use(compression());
    app.get('/', function(req, res) {
      res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
    });


    //app.set('views', __dirname + '/views');
    //app.use(bodyParser.urlencoded({extended:false}));
    app.use(bodyParser.json());

    app.get('/songs', function(req, res) {
      var params = {
        'TableName': 'Songs',
        'ProjectionExpression': "songId, artist, songTitle, favorite," +
        " listenCount," +
        " rating",
      };

      ddb.scan(params, function(err, data) {
        if (err) {
          var returnStatus = 500;

          if (err.code === 'ConditionalCheckFailedException') {
            returnStatus = 409;
          }

          res.status(returnStatus).end();
          console.log('DDB Error: ' + err);
        } else {
          let songs = [];
          data.Items.forEach(function(song) {

            let Song = {
              id: song.songId['S'],
              artist: song.hasOwnProperty('artist') ? song.artist['S'] : '',
              songTitle: song.hasOwnProperty('songTitle') ? song.songTitle['S'] : '',
              favorite: song.hasOwnProperty('favorite') ? song.favorite['S'] : 'false',
              listenCount: song.hasOwnProperty('listenCount') ? song.listenCount['S'] : '0',
              rating: song.hasOwnProperty('rating') ? song.rating['S'] : '',
            };
            songs.push(Song);
            console.log(songs);

          });
          res.status(200).send(Object.keys(songs)
            .map((key) => songs[key]));
        }
      });
    });

    app.post('/songs', function(req, res) {

      const song = {
        'songId': {'S': uuid.v4()},
      };

      ddb.putItem({
          'TableName': "Songs",
          'Item': song,
      }, function(err, data) {
          if (err) {
              var returnStatus = 500;

              if (err.code === 'ConditionalCheckFailedException') {
                  returnStatus = 409;
              }

              res.status(returnStatus).end();
              console.log('DDB Error: ' + err);
          } else {
            const Song = {
              id: song.songId['S']
            };
            res.status(200).send(Song);
          }
      });
    });

    app.delete('/songs/:id', function(req, res) {
      const params = {
        'Key': {
          'songId': {
            'S': req.params.id
          },
        },
        'TableName': 'Songs'
      };

      ddb.deleteItem(params, function(err, data) {
        if(err) {
          console.log(err, err.stack);
          res.status(500).send(err);
        } else {
          res.status(200).end();
        }
      });
    });

    app.put('/songs/:id', function(req, res) {
       //const song = songs[req.params.id];
        console.log('update');


        let artist = req.body.artist;
        let songTitle = req.body.songTitle;
        let favorite = req.body.favorite;
        let listenCount = req.body.listenCount;
        let rating = req.body.rating;

      const params = {
        'Key': {
          'songId': {
            'S': req.params.id
          },
        },
        'TableName': 'Songs',
        'UpdateExpression': 'SET artist = :a, songTitle = :t, favorite = :f,' +
        ' listenCount = :c, rating = :r',
        'ExpressionAttributeValues': {
          ":a": { 'S': artist },
          ":t": { 'S': songTitle},
          ":f": { 'S': favorite},
          ":c": { 'S': listenCount},
          ":r": { 'S': rating},
        },
        'ReturnValues': "UPDATED_NEW"
      };

     ddb.updateItem(params, function(err, data) {
       if(err) {
         console.log(err);
         var returnStatus = 500;

         if (err.code === 'ConditionalCheckFailedException') {
           returnStatus = 409;
         }

         res.status(returnStatus).end();
         console.log('DDB Error: ' + err);
       } else {
         console.log('update return');
         console.log(data);
         let Song = {
           id: req.params.id,
           artist: data.hasOwnProperty('artist') ? data.artist['S'] : artist,
           songTitle: data.hasOwnProperty('songTitle') ? data.songTitle['S'] : songTitle,
           favorite: data.hasOwnProperty('favorite') ? data.favorite['S'] : favorite,
           listenCount: data.hasOwnProperty('listenCount') ? data.listenCount['S'] : listenCount,
           rating: data.hasOwnProperty('rating') ? data.rating['S'] : rating,
         };
         res.status(200).send(Song);
       }
     });
    });

    var port = process.env.PORT || 3000;

    var server = app.listen(port, function () {
        console.log('Server running at http://127.0.0.1:' + port + '/');
    });
}
