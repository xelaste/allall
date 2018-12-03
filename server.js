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
//logger.debug('Hello log files! %s', 'aaa');

app.use(express.static('public'));
app.use(express.static('dist'));
app.use(express.static('css'));
app.use(bodyParser.json())

app.get('/players', function (req, res,next) 
{
    logger.debug(req.body);
    res.set({ 'content-type': 'application/json;charset=utf-8' })
    Player.getPlayers(1000).then(players=> {
        logger.debug("Players: ");
        logger.debug(players)
        res.send(players)
    }).catch(error=>{
        logger.debug("**************************");
        logger.error(err);
        logger.debug("**************************");
        next(err);
    });
})

app.get('/players/winners', function (req, res,next) 
{
    logger.debug(req.body);
    res.set({ 'content-type': 'application/json;charset=utf-8' })
    Player.getWinners(3).then(players=> {
        logger.debug("Players: ");
        logger.debug(players)
        res.send(players)
    }).catch(error=>{
        logger.debug("**************************");
        logger.error(err);
        logger.debug("**************************");
        next(err);
    });
})

app.post('/players', function (req, res,next) {
    logger.debug(req.body);
    res.set({ 'content-type': 'application/json;charset=utf-8' });
    var newPlayer = {
        name: req.body.name,
        score: 0,
        email: "",
        username: req.body.name,
        hash: '',
        profileImage: 'noimage.png'
    };
    Player.createPlayer(newPlayer).then(player=>{
        logger.debug("**************************");
        logger.debug(player);
        logger.debug("**************************");
        res.json(player)}).catch(err=>{
        logger.debug("**************************");
        logger.error(err);
        logger.debug("**************************");
        res.status(500).json({ message: err });
    });
});
        
app.put('/players', function (req, res,next) 
{
    logger.debug(req.body);
    res.set({ 'content-type': 'application/json;charset=utf-8' });
    let updatedPlayer = {
        name: req.body.name,
        score: req.body.score,
        email: "",
        username: req.body.name,
        password: '',
        profileImage: 'noimage.png'
    };
    Player.updatePlayer(updatedPlayer).then(player=>{
        logger.debug("**************************");
        logger.debug(player);
        logger.debug("**************************");
        res.json(player)}).catch(err=>{
        logger.debug("**************************");
        logger.error(err);
        logger.debug("**************************");
        next(err)});
})



app.listen(3000, function () {
    logger.info('Example app listening on port 3000!');
});
