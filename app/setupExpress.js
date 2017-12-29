const cors = require('cors');
const config = require('../config');

module.exports = function (app) {
  app.use(cors({
    origin: config.get('CORS_DOMAIN'),
    optionsSuccessStatus: 200
  }));
};
