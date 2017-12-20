const mongoose = require('mongoose');
const Presenter = require('yayson')({adapter:'default'}).Presenter;

const PodcastSchema = new mongoose.Schema({
  title: { type: String, default: '' },
  image: { type: String, default: '' },
  summary: { type: String, default: '' },
  description: { type: String, default: '' },
  rssLink: { type: String, default: '' }
});

class PodcastsPresenter extends Presenter {}
PodcastsPresenter.prototype.type = 'podcasts';

module.exports = {
  schema: PodcastSchema,
  model: mongoose.model('Podcast', PodcastSchema),
  presenter: PodcastsPresenter
};
