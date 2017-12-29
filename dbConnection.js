const config = require('./config');

const setupDB =
  (onConnect) => {
    const mongoose = require('mongoose');
    mongoose.Promise = global.Promise;

    const { getModelsFiles } = require('./app/utils');
    getModelsFiles().map(require);

    mongoose
      .connect(config.get('MONGO_URL'), { useMongoClient: true, })
      .then(() => onConnect(mongoose.connection))
      .catch(console.error.bind(console, 'DB connection error:'));
  };

module.exports = {
  setupDB
};
