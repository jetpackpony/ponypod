const cors = require('cors');
const config = require('../config');

module.exports = function (app) {
  app.use(cors({
    origin: "*",
    optionsSuccessStatus: 200
  }));
};
