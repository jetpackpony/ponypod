const R = require('ramda');
const mongoose = require('mongoose');
const Podcast = mongoose.model('Podcast');
const Episode = mongoose.model('Episode');

const loopThroughPodcasts =
  (onData, onError, onClose, onDone) => {
    let promisePool = [];
    Podcast
      .find({})
      .select('title rssLink')
      .cursor()
      .on('data', (
        R.compose(
          promisePool.push.bind(promisePool),
          onData
        )
      ))
      .on('error', onError)
      .on('close', (...args) => {
        Promise.all(promisePool)
          .then(onDone)
          .catch(onDone);
        onClose(...args);
      });
  };

const writePodcast =
  R.curry((podcast, feedData) => (
    podcast.set(feedData).save()
  ));

const find = R.invoker(1, 'find');
const upsert = R.invoker(0, 'upsert');
const updateOne = R.invoker(1, 'updateOne');
const makeAddEpisode =
  (ep) => (
    R.tap(
      R.compose(
        updateOne({ $set: ep }),
        upsert,
        find({ guid: ep.guid })
      )
    )
  );
const initBulkOpWithEpisodes =
  R.curry((eps, bulkOp) => (
    R.compose(...(eps.map(makeAddEpisode)))(bulkOp)
  ));

const writeEpisodes =
  R.curry((episodesData) => (
    initBulkOpWithEpisodes(
      episodesData,
      Episode.collection.initializeOrderedBulkOp()
    )
    .execute()
    .then((bulkOp) => ({
      feedEpisodes: episodesData.length,
      bulkOpIsOk: bulkOp.isOk(),
      inserted: bulkOp.nUpserted,
      updated: bulkOp.nModified
    }))
  ));

const writeFeedData =
  R.curry((podcast, { podcastData, episodesData }) => (
    Promise.all([
      writePodcast(podcast, podcastData),
      writeEpisodes(episodesData)
    ])
  ));

module.exports = {
  loopThroughPodcasts,
  writeFeedData,
  writePodcast,
  writeEpisodes
};
