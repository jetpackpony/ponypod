const R = require('ramda');
const { setupDB } = require('../dbConnection');
const {
  loopThroughPodcasts,
  makeImageName,
  updatePodcastRecord
} = require('./dbOperations');
const uploadImage = require('./images');
const logger = require('../logger');

const updatePodcast =
  (podcast) =>
    uploadImage(makeImageName(podcast), podcast.imageOrig)
      .then(updatePodcastRecord(podcast))
      .then(() => logger.info(`DONE: ${podcast.imageOrig}`))
      .catch((err) => logger.error("updatePodcast error", { err }));

const onError =
  (err) => logger.error('loopThroughPodcasts error', { err });

const onClose =
  () => logger.info('Podcast search query completed');

const onDone =
  (connection) => {
    logger.info('Completed all podcasts, closing up');
    connection.close();
  };

const imageWorker =
  (connection) =>
    loopThroughPodcasts(
      updatePodcast,
      onError,
      onClose,
      R.partial(onDone, [connection])
    );

setupDB(imageWorker);
