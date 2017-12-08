'use strict';

const mongoose = require('mongoose');
const Presenter = require('yayson')({adapter:'default'}).Presenter;

const PodcastSchema = new mongoose.Schema({
  title: { type: String, default: '' }
});

class PodcastsPresenter extends Presenter {};
PodcastsPresenter.prototype.type = 'podcasts';

module.exports = {
  model: mongoose.model('Podcast', PodcastSchema),
  presenter: PodcastsPresenter
}
