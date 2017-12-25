const R = require('ramda');
const Podcast = require('../models/podcast').model;
const Episode = require('../models/episode').model;
const { uploadImage } = require('./images');
const slug = require('slug');

const loopThroughPodcasts =
  (newOnly, onData, onError, onClose, onDone) => {
    let promisePool = [];
    Podcast
      .find((newOnly) ? { title: "" } : {})
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

const makeImageName =
  (podcast, data) =>
    slug(`${podcast._id.toString()}-${data.title}`);

const maybeUploadImage =
  (podcast, podcastData) => {
    return new Promise((resolve, reject) => {
      (podcast.image)
        ? resolve(R.assoc('image', podcast.image, podcastData))
        : ((podcastData.image)
          ? (uploadImage(podcastData.image, makeImageName(podcast, podcastData))
            .then((imgUrl) => (
              resolve(R.assoc('image', imgUrl, podcastData))
            )))
            .catch(reject)
          : resolve(podcastData))
    });
  };

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
      maybeUploadImage(podcast, podcastData)
        .then(writePodcast(podcast)),
      writeEpisodes(episodesData)
    ])
  ));

module.exports = {
  loopThroughPodcasts,
  writeFeedData,
  writePodcast,
  writeEpisodes
};
