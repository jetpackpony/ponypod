'use strict';
require('use-strict'); // use strict for all future modules

const express = require('express');
const { setupDB } = require('./dbConnection');
const config = require('./config');

const app = express();

// Bootstrap routes
require('./app/setupExpress')(app);
require('./app/routes')(app);

const listen =
  () => {
    if (module === require.main) {
      app.listen(config.get('PORT'), () => {
        console.log(`App listening on port ${config.get('PORT')}`);
      });
    }
  };

// Connect to DB
setupDB(listen);

// Expose
module.exports = app;
