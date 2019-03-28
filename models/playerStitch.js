const request = require('request-promise');
const logger = require('../logger');

const secret = "[qwerty123456]";
const bullsandcowsURL="http://webhooks.mongodb-stitch.com/api/client/v2.0/app/bullsandcows-pepdu/service/BullsAndCows/incoming_webhook"
let httpService = null;
if (process.env.HTTP_PROXY) {
    httpService =  request.defaults({ proxy: "http://" + process.env.HTTP_PROXY });
}
else
{
    httpService = request;
}
module.exports = new Object();
module.exports.getPlayers = async function (limit) 
{
    let playerListURL = bullsandcowsURL + "/BullsAndCows_getPlayers"
    let url = playerListURL + "?secret=" + secret + "&limit=" + limit;
    logger.debug(url);
    return await httpService.get(url).then((response)=> {
         logger.debug(response);
         let players=JSON.parse(response);
         if (Array.isArray(players))
         {
            players=players.map(e=>{
                return {"_id":e._id.$oid,
                "name":e.name,
                "username":e.username,
                "score":parseInt(e.score.$numberDouble)
                }
            });
         }
         return players
    });
};
module.exports.createPlayer = async function (data) 
{
    let url=bullsandcowsURL + "/BullsAndCows_createPlayer?secret=" + secret;
    var options = {
        method: 'POST',
        uri: url,
        body: data,
        json: true // Automatically stringifies the body to JSON
    };
    return await httpService (options)
    .then(function (player) 
    {
        logger.debug(player);
        return {
            "_id":player._id.$oid,
            "name":player.name,
            "username":player.username,
            "score":parseInt(player.score.$numberDouble)
            };
    }).catch(e=>{logger.error(e);
        throw e.error.error;
    })
};

module.exports.updatePlayer = async function (data) 
{
    logger.debug("updatePlayer in -->");
    logger.debug(data);
    let url=bullsandcowsURL + "/BullsAndCows_updatePlayer?secret=" + secret;
    var options = {
        method: 'POST',
        uri: url,
        body: data,
        json: true
    };
    return await httpService (options)
    .then(function (player) 
    {
        logger.debug(player);
        if (!player.username)
        {
            player.username=palyer.name;
        }
        logger.debug("updatePlayer out <--");
        return {
            "_id":player._id.$oid,
            "name":player.name,
            "username":player.username,
            "score":parseInt(player.score.$numberDouble)
            };
    }).catch(e=>{logger.error(e);
        throw e.error.error;
    })
};

module.exports.getWinners = async function (limit) 
{
    let playerListURL = bullsandcowsURL + "/BullsAndCows_getWinners";
    let url = playerListURL + "?secret=" + secret + "&limit=" + limit;
    logger.debug(url);
    return await httpService.get(url).then((response)=> {
         logger.debug(response);
         let players=JSON.parse(response);
         if (Array.isArray(players))
         {
            players=players.map(e=>{
                return {"_id":e._id.$oid,
                "name":e.name,
                "username":e.username,
                "score":parseInt(e.score.$numberDouble)
                }
            });
         }
         return players
    });
};