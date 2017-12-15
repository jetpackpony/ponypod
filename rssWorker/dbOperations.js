const R = require('ramda');
const mongoose = require('mongoose');
const Podcast = mongoose.model('Podcast');
const Episode = mongoose.model('Episode');

const loopThroughPodcasts =
  (onData, onError, onClose) => (
    Podcast
    .find({})
    .select('title rssLink')
    .cursor()
    .on('data', onData)
    .on('error', onError)
    .on('close', onClose)
  );

const writePodcast =
  R.curry((podcast, feedData) => (
    podcast.set(feedData).save()
  ));

const writeEpisodes =
  R.curry((episodesData) => {
    let bulkUpdate = Episode.collection.initializeOrderedBulkOp();
    episodesData.map((ep) => (
      bulkUpdate.find({ guid: ep.guid })
        .upsert()
        .updateOne({ $set: ep })
    ));
    return bulkUpdate.execute();
  });

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
