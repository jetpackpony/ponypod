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

const { createLogger } = require('./logger');
const { getLogs, log } = createLogger();
const parseFeedWithLog = parseFeed(log);

const updatePodcast =
  (podcast) => (
    parseURL(podcast.rssLink)
    .then(parseFeedWithLog(podcast))
    .then(writeFeedData(podcast))
    .then(([ podcast, bulkEpisodes ]) => {
      log(podcast, 'info', {
        title: podcast.title,
        link: podcast.rssLink,
      });
      log(podcast, 'msg', {
        status: 'DONE',
        parsedEps: bulkEpisodes.feedEpisodes,
        inserted: bulkEpisodes.inserted,
        updated: bulkEpisodes.updated,
      });
    })
    .catch((err) => {
      log(podcast, 'info', {
        title: podcast.title,
        link: podcast.rssLink,
      });
      log(podcast, 'err', err);
    })
  );

const rssWorker =
  R.partial(loopThroughPodcasts, [
    updatePodcast,
    (...args) => log(null, 'err', { err: args }),
    () => log(null, 'msg', { text: 'DB query completed' }),
    () => {
      log(null, 'msg', { text: 'Completed all podcasts, closing up' });
      let logs = getLogs();
      console.log(JSON.stringify(logs, null, 2));
      mongoose.connection.close();
    }
  ]);

mongoose
  .connect(config.get('MONGO_URL'), { useMongoClient: true })
  .then(rssWorker)
  .catch(console.error.bind(console, 'DB connection error:'));


