const loki = require("lokijs");
var db = new loki('quickstart.db', {
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

module.exports.createPlayer = function (newPlayer, callback) 
{
    let players = db.getCollection("players");
    players.insert(newPlayer)
    callback(null,newPlayer);
};

// Fetch All Players
module.exports.getPlayers = function (callback, limit)
{
    let players = db.getCollection("players");
    let result = players.data
    console.log( players)
    callback(null,result);
};

module.exports.updatePlayer = function (updatedPlayer, callback) 
{
    let players = db.getCollection("players");
    let result = players.findOne({ name: updatedPlayer.name });
    result.score=updatedPlayer.score;
    players.update(result);
    callback(null,result);
};

