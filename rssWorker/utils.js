const rssParser = require('rss-parser');

const parserOptions = {
  customFields: {
    feed: ['itunes:image', 'image'],
  },
  maxRedirects: 10
};

const parseURL =
  (url) => new Promise((resolve, reject) => (
    rssParser.parseURL(url, parserOptions, (err, parsed) => (
      (err)
      ? reject(err)
      : resolve(parsed)
    ))
  ));

module.exports = {
  parseURL
};
