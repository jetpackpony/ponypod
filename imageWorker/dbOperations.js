const R = require('ramda');
const Podcast = require('../models/podcast').model;
const slug = require('slug');

const loopThroughPodcasts =
  (onData, onError, onClose, onDone) => {
    let promisePool = [];
    Podcast
      .find({ image: "" })
      .select('title imageOrig')
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

const makeImageName =
  (podcast) =>
    slug(`${podcast._id.toString()}-${podcast.title}`);

const updatePodcastRecord =
  R.curry((podcast, newUrl) => {
    return podcast.set({ image: newUrl }).save();
  });

module.exports = {
  loopThroughPodcasts,
  makeImageName,
  updatePodcastRecord
};
