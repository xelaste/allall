var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost/bullscows', { useMongoClient: true });
// User Schema
var PlayerSchema = mongoose.Schema({
    loginname: {
        type: String,
        index: true
    },
    hash: {
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

module.exports.createPlayer = async function (data) 
{
    let newPlayer = new player();
    newPlayer.name=data.name;
    newPlayer.score=data.score;
    newPlayer.username=data.username,
    newPlayer.profileImage='noimage.png';
    if ( (await player.findOne({ name: data.name })) === null)
    {
        await newPlayer.save();
        return await player.findOne({ name: newPlayer.name });
    }   
    else
    {
        throw 'Player name "' + data.name + '" is already taken';
    }
    
};

// Fetch All Classes
module.exports.getPlayers = async function (limit) {
    let players = await player.find().limit(limit);
    return players;
};

// Fetch All Winners
module.exports.getWinners = async function (limit) 
{
    let players = await player.find({ score: { $gt: 0 } }).sort( { score: -1 } ).limit(limit);
    return players;
};

module.exports.updatePlayer = async function (data) 
{
    await player.findOneAndUpdate(
        { name: data.name },
        {
            $inc: { "score": data.score }
        },
        {save: true, upsert: true}
    )
};
