const logger = require('../logger');
const playerListURL = "https://webhooks.mongodb-stitch.com/api/client/v2.0/app/bullsandcows-pepdu/service/BullsAndCows/incoming_webhook/BullsAndCows_getPlayers?secret=[qwerty123456]\&limit=10https://webhooks.mongodb-stitch.com/api/client/v2.0/app/bullsandcows-pepdu/service/BullsAndCows/incoming_webhook/BullsAndCows_getPlayers"
const secret = "[qwerty123456]";
const request = require('request-promise');
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
    let url = playerListURL + "?secret" + secret + "&limit=" + limit;
    logger.debug(url);
    await httpService.get(url).then((response)=> {
         logger.debug(response);
        return response;
    });
};
module.exports.createPlayer = function (data) {
};
