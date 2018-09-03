var express = require('express');
const winston = require('winston')
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, prettyPrint,colorize } = format;
var bodyParser = require('body-parser')
var Player = require('./models/player.js');
if (process.env.LOG_LEVEL)
{
    winston.level = process.env.LOG_LEVEL;
}
else
{
    winston.level = 'info';
}
const logger = winston.createLogger({
    level: winston.level,
    format: combine(
        colorize({all:true}),
        timestamp({
          format: 'YYYY-MM-DD HH:mm:ss'
        }),
       //
        // The simple format outputs
        // `${level}: ${message} ${[Object with everything else]}`
        //
        
       format.splat(),
       //format.simple(),
        //
        // Alternatively you could use this custom printf format if you
        // want to control where the timestamp comes in your final message.
        // Try replacing `format.simple()` above with this:
        //
       //format.printf(info => `${info.timestamp} ${info.level.toUpperCase()}:${info.message}`),
        format.printf(info => `${info.level} ${info.timestamp} ${info.message}`),
        
      ),
    transports: [
      //
      // - Write to all logs with level `info` and below to `combined.log` 
      // - Write all logs error (and below) to `error.log`.
      //
      new winston.transports.Console()
    ]
  });

var app = express();
logger.debug('Hello log files! %s', 'aaa');

app.use(express.static('public'));
app.use(express.static('dist'));
app.use(express.static('css'));
app.use(bodyParser.json())

app.get('/players', function (req, res) {
    logger.debug(req.body);
    res.set({ 'content-type': 'application/json;charset=utf-8' })
    Player.getPlayers(function (err, players) {
        if (err) {
            logger.debug("**************************");
            logger.error(err);
            logger.debug("**************************");
            res.send(err);
        } else {
            logger.debug("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");
            logger.debug("Players: " + players);
            res.send(players)
            logger.debug("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");
        }
    }, 1000);
   
    
})


app.post('/players', function (req, res) {
    console.log(req.body);
    res.set({ 'content-type': 'application/json;charset=utf-8' });
    var newPlayer = new Player({
        name: req.body.name,
        score: 0,
        email: "",
        username: req.body.name,
        password: '',
        profileImage: 'noimage.png'
    });
    Player.createPlayer(newPlayer,
        function (err, player) {
            if (err) throw err;
            console.log(player);
            res.send(player)
        });
})

app.put('/players', function (req, res) {
    console.log(req.body);
    res.set({ 'content-type': 'application/json;charset=utf-8' });
    var updatedPlayer = new Player({
        name: req.body.name,
        score: req.body.score,
        email: "",
        username: req.body.name,
        password: '',
        profileImage: 'noimage.png'
    });
    Player.updatePlayer(updatedPlayer,
        function (err, player) {
            if (err) throw err;
            console.log(player);
            res.send(player)
        });
})



app.listen(3000, function () {
    logger.info('Example app listening on port 3000!');
});
