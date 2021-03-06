const { createLogger, format, transports } = require('winston');
const { combine, timestamp, prettyPrint } = format;
const path = require('path');
const logsPath = 'logs';

const logger = createLogger({
  level: 'info',
  format: combine(
    timestamp(),
    prettyPrint()
  ),
  transports: [
    new transports.File({
      filename: path.join(logsPath, 'error.log'),
      level: 'error',
    }),
    new transports.File({
      filename: path.join(logsPath, 'combined.log')
    }),
    new transports.Console({
      format: format.simple()
    })
  ]
});

module.exports = logger;
