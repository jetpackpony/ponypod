const R = require('ramda');
const moment = require('moment');
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

const getFirstNotNil =
  R.compose(R.head, R.reject(R.isNil));
const getPodacstImage =
  R.converge(
    R.unapply(getFirstNotNil),
    [
      R.path(['itunes', 'image']),
      R.path(['entries', '0', 'itunes', 'image']),
      R.path(['itunes:image', '$', 'href']),
      R.path(['image', 'url', '0']),
    ]
  );

const getPodcastDataFromFeed =
  (log, feed) => ({
    title: feed.title,
    image: getPodacstImage(feed),
    summary: feed.description,
    description: feed.description
  });

const parseEpisode =
  R.curry((podcast, ep) => ({
    podcast: podcast._id,
    guid: ep.guid,
    title: ep.title,
    publishedAt: moment(ep.pubDate).toDate(),
    duration: parseDuration(ep.itunes.duration || '00:00'),
    summary: extractSummary(ep.content),
    fullDescription: ep.content,
    mp3Link: ep.enclosure.url
  }));

const failedParsingEpisode =
  R.curry((log, podcast, err, ep) => {
    log(podcast, 'err', {
      title: `Failed to parse episode: ${ep.guid || "(can't get guid)"}`,
      errMessage: err.toString(),
      stack: err.stack,
      episodeObj: ep
    });
    return null;
  });

const getEpisodesDataFromFeed =
  (log, podcast) => R.compose(
    R.reject(R.isNil),
    R.map(R.tryCatch(
      parseEpisode(podcast),
      failedParsingEpisode(log, podcast)
    )),
    R.prop('entries')
  );

const parseFeed =
  R.curry((log, podcast, { feed }) => ({
    podcastData: getPodcastDataFromFeed(log, feed),
    episodesData: getEpisodesDataFromFeed(log, podcast)(feed)
  }));

module.exports = {
  parseFeed,
  parseDuration,
  extractSummary
};

