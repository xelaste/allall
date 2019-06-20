const loki = require("lokijs");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Logger = require('../logger');
const config = require('config');
const logger = Logger.createLogger("playerLoki");

var db = new loki(config.dbConfig.loki.dbname, {
    autoload: true,
    autoloadCallback : databaseInitialize,
    autosave: true, 
    autosaveInterval: 4000
});

function databaseInitialize() {
    let players = db.getCollection("players");
    if (players === null) {
        players = db.addCollection("players");
    }
    return players;
}  

module.exports = new Object();

module.exports.init=databaseInitialize;

module.exports.createPlayer = async function (newPlayer) 
{
    let players = db.getCollection("players");
    if (newPlayer.password) {
        newPlayer.hash = bcrypt.hashSync(newPlayer.password, 10);
    }    
    let result = players.findOne({ name: newPlayer.name });
    if (result === null)
    {
        players.insert(newPlayer)
        return players.findOne({ name: newPlayer.name });
    }      
    else
    {
        throw 'Player name "' + newPlayer.name + '" is already taken';
    }
    
};

// Fetch All Players
module.exports.getPlayers = async function (limit)
{
    let players = db.getCollection("players");
    result = players.find().slice(0,limit);
    return result;
};

// Fetch All Winners
module.exports.getWinners = async function (limit)
{
    let players = db.getCollection("players");
    let pview = players.addDynamicView('progeny');
    pview.applySimpleSort('score',true);
    let result = pview.data().slice(0,limit).filter(x=>x.score>0);
    return result;
};

module.exports.updatePlayer = async function (updatedPlayer) 
{
    let players = db.getCollection("players");
    let result = players.findOne({ name: updatedPlayer.name });
    result.score+=updatedPlayer.score;
    await players.update(result);
    return result;
};

module.exports.login = async function (username,password) 
{
    logger.debug("login in -->");
    let players = db.getCollection("players");
    let player = players.findOne({ name: username });
    if (player && bcrypt.compareSync(password, player.hash)) 
    {
        const token = jwt.sign({ sub: player.id }, configj.jwt.secret);
        logger.debug("login out ---<");
        return {
            ...player,
            token
        };
    }
    else
    {
        return false;
    }
};
