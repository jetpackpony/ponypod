const R = require('ramda');
const { setupDB } = require('../dbConnection');
const { parseURL } = require('./utils');
const { parseFeed } = require('./parseFeed');
const {
  loopThroughPodcasts,
  writeFeedData
} = require('./dbOperations');

const logger = require('../logger');

const newOnly = false;

const updatePodcast =
  (podcast) => (
    parseURL(podcast.rssLink)
    .then(parseFeed(podcast))
    .then(writeFeedData(podcast))
    .then(([ podcast, bulkEpisodes ]) =>
      logger.info([
        `DONE: ${podcast.rssLink}`,
        `Episodes Parsed: ${bulkEpisodes.feedEpisodes}`,
        `Episodes Inserted: ${bulkEpisodes.inserted}`,
        `Episodes Updated: ${bulkEpisodes.updated}`
      ].join("\n"))
    )
    .catch((err) =>
      logger.error(`updatePodcast error: ${podcast.rssLink}`, { err })
    )
  );

const onError =
  (...args) => logger.error('loopThroughPodcasts error', { err: args });

const onClose =
  () => logger.info('Podcast search query completed');

const onDone =
  (connection) => {
    logger.info('Completed all podcasts, closing up');
    connection.close();
  };

const rssWorker =
  (connection) =>
    loopThroughPodcasts(
      newOnly,
      updatePodcast,
      onError,
      onClose,
      R.partial(onDone, [connection])
    );

setupDB(rssWorker);

