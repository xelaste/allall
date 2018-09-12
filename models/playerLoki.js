const loki = require("lokijs");
var db = new loki('quickstart.db', {
    autoload: true,
    autoloadCallback : databaseInitialize,
    autosave: true, 
    autosaveInterval: 500
});

function databaseInitialize() {
    var players = db.getCollection("players");
  
    if (players === null) {
        players = db.addCollection("players");
    }
    return players;
}  

const players = module.exports = databaseInitialize();

module.exports.createPlayer = function (newPlayer, callback) 
{
    players.insert(newPlayer)
    callback(null,newPlayer);
};

// Fetch All Players
module.exports.getPlayers = function (callback, limit)
{
    result = players.find();
    callback(null,result);
};

module.exports.updatePlayer = function (updatedPlayer, callback) 
{
    let result = players.findOne({ name: updatedPlayer.name });
    result.score=updatedPlayer.score;
    players.update(result);
    callback(null,result);
};

