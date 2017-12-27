const R = require('ramda');
const { setupDB } = require('../dbConnection');
const {
  loopThroughPodcasts,
  makeImageName,
  updatePodcastRecord
} = require('./dbOperations');
const uploadImage = require('./images');

const { createLogger } = require('../rssWorker/logger');
const { getLogs, log } = createLogger();

const updatePodcast =
  (podcast) => {
    return uploadImage(makeImageName(podcast), podcast.imageOrig)
      .then(updatePodcastRecord(podcast))
      .then(() => {
        console.log(`DONE: ${podcast.imageOrig}`);
      })
      .catch((err) => {
        console.log(`ERROR: ${err}`);
      });
  };


const imageWorker =
  (connection) => (
    R.apply(
      loopThroughPodcasts,
      [
        updatePodcast,
        (...args) => log(null, 'err', { err: args }),
        () => log(null, 'msg', { text: 'DB query completed' }),
        () => {
          log(null, 'msg', { text: 'Completed all podcasts, closing up' });
          console.log(JSON.stringify(getLogs(), null, 2));
          connection.close();
        }
      ]
    )
  );

setupDB(imageWorker);
