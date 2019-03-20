var express = require('express');
var bodyParser = require('body-parser')
let logger = require('./logger');
var Player = require('./models/player.js');

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
