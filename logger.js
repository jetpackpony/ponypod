const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, prettyPrint } = format;
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
    })
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new transports.Console({
    format: combine(
      timestamp(),
      prettyPrint()
    )
  }));
}

module.exports = logger;
