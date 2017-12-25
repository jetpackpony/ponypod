const R = require('ramda');
const { setupDB } = require('../dbConnection');
const { parseURL } = require('./utils');
const { parseFeed } = require('./parseFeed');
const {
  loopThroughPodcasts,
  writeFeedData
} = require('./dbOperations');

const { createLogger } = require('./logger');
const { getLogs, log } = createLogger();
const parseFeedWithLog = parseFeed(log);

const newOnly = true;

const updatePodcast =
  (podcast) => (
    parseURL(podcast.rssLink)
    .then(parseFeedWithLog(podcast))
    .then(writeFeedData(podcast))
    .then(([ podcast, bulkEpisodes ]) => {
      console.log(`DONE: ${podcast.rssLink}`);
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
      console.log(`ERROR: ${podcast.rssLink}: ${err}`);
      log(podcast, 'info', {
        title: podcast.title,
        link: podcast.rssLink,
      });
      log(podcast, 'err', err);
    })
  );

const rssWorker =
  (connection) => (
    R.apply(loopThroughPodcasts, [
      newOnly,
      updatePodcast,
      (...args) => log(null, 'err', { err: args }),
      () => log(null, 'msg', { text: 'DB query completed' }),
      () => {
        log(null, 'msg', { text: 'Completed all podcasts, closing up' });
        console.log(JSON.stringify(getLogs(), null, 2));
        connection.close();
      }
    ])
  );

setupDB(rssWorker);

