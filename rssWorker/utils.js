const rssParser = require('rss-parser');

const parseURL =
  (url) => new Promise((resolve, reject) => (
    rssParser.parseURL(url, (err, parsed) => (
      (err)
      ? reject(err)
      : resolve(parsed)
    ))
  ));

module.exports = {
  parseURL
};
