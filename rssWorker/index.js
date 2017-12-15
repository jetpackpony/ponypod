const R = require('ramda');
const config = require('../config');
const { parseURL } = require('./utils');
const { getModelsFiles } = require('../app/utils');
getModelsFiles().map(require);
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const { parseFeed } = require('./parseFeed');
const {
  loopThroughPodcasts,
  writeFeedData
} = require('./dbOperations');

const updatePodcast =
  (podcast) => (
    parseURL(podcast.rssLink)
      .then(parseFeed(podcast))
      .then(writeFeedData(podcast))
      .then(([ podcast, bulkEpisodes ]) => {
        console.log(`DONE: ${podcast.title}`);
        console.log(`Link: ${podcast.rssLink}`);
        console.log(`${bulkEpisodes.nInserted} new episodes inserted`);
        console.log(`${bulkEpisodes.nModified} episodes updated`);
        console.log(`===============`);
      })
      .catch((err) => {
        console.log(
          'error: ',
          { title: podcast.title, link: podcast.rssLink },
          err
        );
      })
  );

const rssWorker =
  R.partial(loopThroughPodcasts, [
    updatePodcast,
    console.error,
    () => console.log("closed")
  ]);

mongoose
  .connect(config.get('MONGO_URL'), { useMongoClient: true })
  .then(rssWorker)
  .catch(console.error.bind(console, 'DB connection error:'));


