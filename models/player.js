if (process.env.DB-TYPE-MONGO)
{
    module.exports = require ("./playerLoki");
}
else
{
    module.exports = require ("./playerMongo");
}
