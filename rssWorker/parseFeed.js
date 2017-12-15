const R = require('ramda');
const striptags = require('striptags');
const { parseIntDecimal } = require('../app/utils/numbers');

const hmsToSeconds = ([h, m, s]) => h * 3600 + m * 60 + s;
const nullsToZeros = (i) => i || 0;
const nullsToEmptyStrings = (str) => str || "";

const parseDuration =
  R.compose(
    hmsToSeconds,
    R.map(nullsToZeros),
    R.map(parseIntDecimal),
    R.slice(1, 4),
    R.match(/(?:(\d{1,2}):)?(\d{1,2}):(\d{1,2})/)
  );

const extractSummary =
  (str) => (
    R.compose(
      striptags,
      nullsToEmptyStrings,
      (matches) => matches[1] || str,
      R.match(/<p>(.+)<\/p>/),
      R.invoker(0, 'trim')
    )(str)
  );

const getPodcastDataFromFeed =
  R.curry((feed) => ({
    title: feed.title,
    image: feed.itunes.image,
    summary: feed.description,
    description: feed.description
  }));

const getEpisodesDataFromFeed =
  R.curry((podcast, feed) => (
    feed.entries.map((ep) => ({
      podcast,
      guid: ep.guid,
      title: ep.title,
      publishedAt: ep.pubDate,
      duration: parseDuration(ep.itunes.duration || '00:00'),
      summary: extractSummary(ep.content),
      fullDescription: ep.content,
      mp3Link: ep.enclosure.url
    }))
  ));

const parseFeed =
  R.curry((podcast, { feed }) => ({
    podcastData: getPodcastDataFromFeed(feed),
    episodesData: getEpisodesDataFromFeed(podcast, feed)
  }));

module.exports = {
  parseFeed,
  parseDuration,
  extractSummary
};

