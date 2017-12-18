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
        console.log(`${bulkEpisodes.feedEpisodes} episodes found in the feed`);
        console.log(`${bulkEpisodes.inserted} new episodes inserted`);
        console.log(`${bulkEpisodes.updated} episodes updated`);
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
    R.partial(console.log, ["closed"]),
    () => {
      console.log(`Completed all podcasts, closing up`);
      mongoose.connection.close();
    }
  ]);

mongoose
  .connect(config.get('MONGO_URL'), { useMongoClient: true })
  .then(rssWorker)
  .catch(console.error.bind(console, 'DB connection error:'));


