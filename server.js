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

    var ddb = new AWS.DynamoDB({region: 'us-west-2'});

    var ddbTable =  process.env.STARTUP_SONGS_TABLE;


    var app = express();
    app.use(express.static('public'));
    app.use(compression());
    app.get('*', function(req, res) {
      res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
    });


    //app.set('views', __dirname + '/views');
    //app.use(bodyParser.urlencoded({extended:false}));
    app.use(bodyParser.json());

    app.get('/songs', function(req, res) {
      var params = {
        TableName: "Songs",
        ProjectionExpression: "songId, artist, songTitle, favorite," +
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
          data.Items.forEach(function(data) {
            let song = {
              id: data.songId,
              artist: data.artist,
              songTitle: data.songTitle,
              favorite: data.favorite,
              listenCount: data.listenCount,
              rating: data.rating
            };
            songs.push(song);
            console.log(songs);
            res.status(200).send(Object.keys(songs)
              .map((key) => songs[key]));
            res.send(songs);
          });

        }
      });
    });

    app.post('/songs', function(req, res) {

      const song = {
        'songId': {'S': uuid.v4()},
      };
      console.log(song);

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
          }
        res.status(200).end();

        //songs[song.id] = song;
        res.send(song);
      });
    });

    app.delete('/songs/:id', function(req, res) {
      const song = songs[req.params.id];
      if (!song) {
        return res.status(404).send('Song not found');
      }
      delete songs[req.params.id];
      res.send();
    });

    app.put('/songs/:id', function(req, res) {
       let songId = songs[req.params.id];

       const song = {
        'artist': {'S': req.body.artist},
        'songTitle': {'S': req.body.songTitle},
        'favorite': {'S': req.body.favorite},
        'listenCount': {'S': req.body.listenCount},
        'rating': {'S': req.body.rating},
      };


      if (!song) {
        return res.status(404).send('Song not found');
      }

      song.artist = req.body.artist;
      song.songTitle = req.body.songTitle;
      song.favorite = req.body.favorite;
      song.listenCount = req.body.listenCount;
      song.rating = req.body.rating;


      res.send(song);
    });

    var port = process.env.PORT || 3000;

    var server = app.listen(port, function () {
        console.log('Server running at http://127.0.0.1:' + port + '/');
    });
}
