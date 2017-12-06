'use strict';

const fs = require('fs');
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const config = require('./config');

const app = express();

// Bootstrap models
const models = path.join(__dirname, 'models');
fs.readdirSync(models)
  .filter(file => ~file.indexOf('.js'))
  .forEach(file => require(path.join(models, file)));

// Bootstrap routes
require('./app/setupExpress')(app);
require('./app/routes')(app);

// Connect to DB
mongoose
  .connect(config.get('MONGO_URL'), {
    useMongoClient: true,
  })
  .then(listen)
  .catch(console.error.bind(console, 'DB connection error:'));

// Expose
module.exports = app;

function listen (db) {
  if (module === require.main) {
    const server = app.listen(config.get('PORT'), () => {
      console.log(`App listening on port ${config.get('PORT')}`);
    });
  }
}
