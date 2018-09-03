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

module.exports.createPlayer = function (newPlayer, callback) {
    newPlayer.save(callback);
};

// Fetch All Classes
module.exports.getPlayers = function (callback, limit) {
    return player.find(callback).limit(limit);
};

module.exports.updatePlayer = function (updatedPlayer, callback) 
{
    player.findOneAndUpdate(
        { name: updatedPlayer.name },
        {
            $set: { "score": updatedPlayer.score }
        },
        {save: true, upsert: true},
        callback
    )
};
