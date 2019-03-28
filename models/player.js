switch (process.env.DB_TYPE)
{
    case "MONGO": module.exports = require ("./playerMongo");
                  break;
    case "STITCH": module.exports = require ("./playerStitch");
                   break;
    default:
        module.exports = require ("./playerLoki");
}
