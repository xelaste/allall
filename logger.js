const winston = require('winston')
const { format,loggers} = require('winston');
const { combine, timestamp, label, prettyPrint,colorize } = format;
console.log("**********************");
console.log(process.env.LOG_LEVEL);
console.log("**********************");
if (process.env.LOG_LEVEL)
{
    winston.level = process.env.LOG_LEVEL;
}
else
{
    winston.level = 'info';
}

module.exports = winston.createLogger({
    level: winston.level,
    format: combine(
        colorize({all:true}),
        timestamp({
          format: 'YYYY-MM-DD HH:mm:ss'
        }),
       //
        // The simple format outputs
        // `${level}: ${message} ${[Object with everything else]}`
        //
        
       format.splat(),
       //format.simple(),
        //
        // Alternatively you could use this custom printf format if you
        // want to control where the timestamp comes in your final message.
        // Try replacing `format.simple()` above with this:
        //
       //format.printf(info => `${info.timestamp} ${info.level.toUpperCase()}:${info.message}`),
        format.printf(info => `${info.level} ${info.timestamp} ${info.message}`),
        
      ),
    transports: [
      //
      // - Write to all logs with level `info` and below to `combined.log` 
      // - Write all logs error (and below) to `error.log`.
      //
      new winston.transports.Console()
    ]
  });
