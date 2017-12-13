const nconf = module.exports = require('nconf');
const path = require('path');

nconf
  .argv()
  .env([
    'MONGO_URL',
    'PORT',
    'API_ENDPOINT',
    'CORS_DOMAIN'
  ])
  .file({
    file: path.join(
      __dirname,
      `${process.env.NODE_ENV || 'development'}.config.json`
    )
  })
  .defaults({
    PORT: 8080,
    API_ENDPOINT: '/api'
  });

// Check for required settings
checkConfig('MONGO_URL');

function checkConfig (setting) {
  if (!nconf.get(setting)) {
    throw new Error(`You must set ${setting} as an environment variable or in config.json!`);
  }
}
