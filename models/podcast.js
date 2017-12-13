const R = require('ramda');
const mongoose = require('mongoose');
const Presenter = require('yayson')({adapter:'default'}).Presenter;
const faker = require('faker');

const PodcastSchema = new mongoose.Schema({
  title: { type: String, default: '' },
  image: { type: String, default: '' },
  summary: { type: String, default: '' },
  description: { type: String, default: '' },
  rssLink: { type: String, default: '' }
});

class PodcastsPresenter extends Presenter {}
PodcastsPresenter.prototype.type = 'podcasts';

const makePodcast = () => ({
  title: faker.company.companyName(),
  image: faker.internet.avatar(),
  summary: faker.lorem.paragraph(),
  description: faker.lorem.paragraphs(),
  rssLink: faker.internet.url()
});
const generatePodcasts = R.times(makePodcast);

module.exports = {
  schema: PodcastSchema,
  model: mongoose.model('Podcast', PodcastSchema),
  presenter: PodcastsPresenter,
  generator: generatePodcasts
};
