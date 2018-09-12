if (process.env.DB_TYPE_MONGO)
{
    module.exports = require ("./playerMongo");
}
else
{
    module.exports = require ("./playerLoki");
}
