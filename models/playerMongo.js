var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost/bullscows', { useMongoClient: true });

var db = mongoose.connection;

// User Schema
var PlayerSchema = mongoose.Schema({
    loginname: {
        type: String,
        index: true
    },
    password: {
        type: String,
    },
    email: {
        type: String
    },
    name: {
        type: String
    },
    score: {
        type: Number
    },
    profileimage: {
        type: String
    }

});

var player = module.exports = mongoose.model('Player', PlayerSchema);

module.exports.createPlayer = function (data, callback) 
{
    let newPlayer = new player();
    newPlayer.name=data.name;
    newPlayer.score=data.score;
    newPlayer.username=data.username,
    newPlayer.profileImage='noimage.png';
    newPlayer.save(callback);
};

// Fetch All Classes
module.exports.getPlayers = function (callback, limit) {
    return player.find(callback).limit(limit);
};

module.exports.updatePlayer = function (data, callback) 
{
    player.findOneAndUpdate(
        { name: data.name },
        {
            $set: { "score": data.score }
        },
        {save: true, upsert: true},
        callback
    )
};
