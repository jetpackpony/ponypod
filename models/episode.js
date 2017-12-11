'use strict';

const R = require('ramda');
const faker = require('faker');
const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.ObjectId;
const Presenter = require('yayson')({adapter:'default'}).Presenter;
const PodcastSchema = require('./podcast').schema;

const EpisodeSchema = new mongoose.Schema({
  podcast: { type: ObjectId, ref: PodcastSchema },
  title: { type: String, default: '' },
  publishedAt: { type: Date, default: Date.now },
  duration: { type: Number, default: 0 },
  summary: { type: String, default: '' },
  fullDescription: { type: String, default: '' },
  mp3Link: { type: String, default: '' }
});

class EpisodesPresenter extends Presenter {};
EpisodesPresenter.prototype.type = 'episodes';

const makeEpisode = (podcast) => ({
  podcast,
  title: faker.company.companyName(),
  publishedAt: faker.date.past(),
  duration: faker.random.number(),
  summary: faker.lorem.paragraph(),
  fullDescription: faker.lorem.paragraphs(),
  mp3Link: faker.internet.url()
});
const generateEpisodes =
  R.curry((num, pod) => R.times(makeEpisode.bind(null, pod), num));

module.exports = {
  schema: EpisodeSchema,
  model: mongoose.model('Episode', EpisodeSchema),
  presenter: EpisodesPresenter,
  generator: generateEpisodes
};
