const R = require('ramda');
const posdcasts = require('./controllers/podcasts');
const episodes = require('./controllers/episodes');
const config = require('../config');

const errMessages404 = ['not found', 'Cast to ObjectId failed'];
const moreThan0 = R.flip(R.gte)(0);
const anyMatches = R.unapply(R.any(moreThan0));
const is404Error =
  R.converge(
    anyMatches,
    R.map(R.indexOf, errMessages404)
  );

module.exports = (app) => {

  app.use(`${config.get('API_ENDPOINT')}/podcasts`, posdcasts);
  app.use(`${config.get('API_ENDPOINT')}/episodes`, episodes);

  app.use((err, req, res, next) => {
    (err.message && is404Error(err.message))
      ? next()
      : (
        console.error(err.stack),
        res.status(500).json({
          errors: [{
            status: '500',
            title: 'Server error occured'
          }]
        })
      );
  });

  // assume 404 since no middleware responded
  app.use((req, res) => {
    res.status(404).json({
      errors: [{
        status: '404',
        title: 'Not found'
      }]
    });
  });
};
