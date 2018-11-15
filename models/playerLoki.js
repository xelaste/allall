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

module.exports.init=databaseInitialize;

module.exports.createPlayer = async function (newPlayer) 
{
    let players = db.getCollection("players");
    players.insert(newPlayer)
    let result = await players.findOne({ name: newPlayer.name });
    return result;
};

// Fetch All Players
module.exports.getPlayers = async function (limit)
{
    let players = db.getCollection("players");
    result = await players.find().slice(0,limit);
    return result;
};

module.exports.updatePlayer = async function (updatedPlayer) 
{
    let players = db.getCollection("players");
    let result = players.findOne({ name: updatedPlayer.name });
    result.score=updatedPlayer.score;
    await players.update(result);
    return result;
};

