'use strict';

const posdcasts = require('./controllers/podcasts');

module.exports = function (app, passport) {

  app.use('/podcasts', posdcasts);

  app.use(function (err, req, res, next) {
    // treat as 404
    if (err.message
      && (~err.message.indexOf('not found')
      || (~err.message.indexOf('Cast to ObjectId failed')))) {
      return next();
    }
    console.error(err.stack);
    // error page
    res.status(500).json('500', { error: err.stack });
  });

  // assume 404 since no middleware responded
  app.use(function (req, res, next) {
    res.status(404).json('404', {
      url: req.originalUrl,
      error: 'Not found'
    });
  });
};