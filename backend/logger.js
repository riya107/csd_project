const { createLogger, format, transports } = require("winston");

const logger = createLogger({
  format: format.combine(
    format.timestamp(),
    format.colorize(),
    format.printf(
      (info) => `[${info.timestamp}] ${info.level}: ${info.message}`
    )
  ),
  transports: [
    new transports.Console({
      timestamp: function () {
        return new Date().toISOString();
      },
    }),
    new transports.File({
      filename: "app.log",
      encoding: 'utf8'
    }),
  ],
});

module.exports = logger;
