'use strict';

const R = require('ramda');
const faker = require('faker');
const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.ObjectId;
const Presenter = require('yayson')({adapter:'default'}).Presenter;
const PodcastSchema = require('./podcast').schema;
const PodcastsPresenter = require('./podcast').presenter;
const { getRandomInt } = require('../app/utils');

const EpisodeSchema = new mongoose.Schema({
  podcast: { type: ObjectId, ref: 'Podcast' },
  title: { type: String, default: '' },
  publishedAt: { type: Date, default: Date.now },
  duration: { type: Number, default: 0 },
  summary: { type: String, default: '' },
  fullDescription: { type: String, default: '' },
  mp3Link: { type: String, default: '' }
});

class EpisodesPresenter extends Presenter {};
EpisodesPresenter.prototype.type = 'episodes';
EpisodesPresenter.prototype.relationships = () => ({
  'podcast': PodcastsPresenter
});

const mp3List = [
  "http://traffic.libsyn.com/hellointernet/HI74_Do_People_Read_The_Filenames.mp3",
  "http://traffic.libsyn.com/hellointernet/HI73_Final_fixedv3.mp3",
  "http://feedproxy.google.com/~r/freakonomicsradio/~5/cjzkNu-kqfA/freakonomics_podcast120716.mp3",
  "http://www.podtrac.com/pts/redirect.mp3/podcasts.howstuffworks.com/hsw/podcasts/sysk/2016-12-06-sysk-horoscopes-final-2.mp3",
  "https://golangshow.com/cdn/episodes/086.mp3"
];
const randMP3 =
  () => mp3List[getRandomInt(0, mp3List.length - 1)];
const makeEpisode = (podcast) => ({
  podcast,
  title: faker.company.companyName(),
  publishedAt: faker.date.past(),
  duration: faker.random.number(),
  summary: faker.lorem.paragraph(),
  fullDescription: faker.lorem.paragraphs(),
  mp3Link: randMP3()
});
const generateEpisodes =
  R.curry((num, pod) => R.times(makeEpisode.bind(null, pod), num));

module.exports = {
  schema: EpisodeSchema,
  model: mongoose.model('Episode', EpisodeSchema),
  presenter: EpisodesPresenter,
  generator: generateEpisodes
};
