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

    AWS.config.region = process.env.REGION

    var ddb = new AWS.DynamoDB({region: 'us-west-2'});

    var ddbTable =  process.env.STARTUP_MUSIC_TABLE;
    var app = express();

    app.use(express.static('public'));
    app.use(compression());
    app.get('*', function(req, res) {
      res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
    });


    //app.set('views', __dirname + '/views');
    app.use(bodyParser.urlencoded({extended:false}));

    app.post('/addTrack', function(req, res) {
      console.log(req.body);
        var item = {
            'Artist': {'S': req.body.artist},
            'SongTitle': {'S': req.body.songTitle},
            'favorite': {'S': req.body.favorite},
            'listenCount': {'N': req.body.listenCount},
            'rating': {'S': req.body.rating },
        };

        ddb.putItem({
            'TableName': "Music",
            'Item': item,
        }, function(err, data) {
            if (err) {
                var returnStatus = 500;

                if (err.code === 'ConditionalCheckFailedException') {
                    returnStatus = 409;
                }

                res.status(returnStatus).end();
                console.log('DDB Error: ' + err);
            }
        });
        res.status(200).end();
    });

    app.get('/getTracks', function(req, res) {

    })

    var port = process.env.PORT || 3000;

    var server = app.listen(port, function () {
        console.log('Server running at http://127.0.0.1:' + port + '/');
    });
}
