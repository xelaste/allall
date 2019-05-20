var express = require('express');
var bodyParser = require('body-parser')
const Logger = require('./logger');
const logger = Logger.createLogger("server");
var path = require('path');
var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

function logRequest(req, res, next) 
{
    logger.debug(req.url)
    next();
}
app.use(logRequest);
function logError(err, req, res, next) {
    logger.error(err)
    next();
}
app.use(logError);

app.use(express.static('public'));
app.use(express.static('dist'));
app.use(express.static('css'));

app.use('/players', require("./controllers/playerController"));


app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, '/public/index.html'), function(err) {
      if (err) {
        res.status(500).send(err)
      }
    })
  })

app.listen(3000, function () {
    logger.info('Example app listening on port 3000!');
});
