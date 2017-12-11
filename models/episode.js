'use strict';

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

module.exports = {
  schema: EpisodeSchema,
  model: mongoose.model('Episode', EpisodeSchema),
  presenter: EpisodesPresenter
};
