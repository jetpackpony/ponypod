const R = require('ramda');
const faker = require('faker');
const seeder = require('mongoose-seed');
const config = require('./config');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const { getModelsFiles } = require('./app/utils');

getModelsFiles().map(require);
const Podcast = mongoose.model('Podcast');

console.log(`Connecting to ${config.get('MONGO_URL')}`);
seeder.connect(config.get('MONGO_URL'), () => {
  seeder.loadModels(getModelsFiles());
  seeder.clearModels(['Podcast', 'Episode'], () => {
    seeder.populateModels([
      {
        model: 'Podcast',
        documents: generatePodcasts(3)
      }
    ], () => {
      Podcast.find({}).exec((err, podcasts) => {
        const episodes = R.flatten(
          podcasts.map((pod) => generateEpisodes(pod, 3))
        );
        seeder.populateModels([
          {
            model: 'Episode',
            documents: episodes
          }
        ], (...args) => {
          seeder.disconnect();
        });
      });
    });
  });
});

const makePodcast = () => ({
  title: faker.company.companyName(),
  image: faker.internet.avatar(),
  summary: faker.lorem.paragraph(),
  description: faker.lorem.paragraphs(),
  rssLink: faker.internet.url()
});

const makeEpisode = (podcast) => ({
  podcast,
  title: faker.company.companyName(),
  publishedAt: faker.date.past(),
  duration: faker.random.number(),
  summary: faker.lorem.paragraph(),
  fullDescription: faker.lorem.paragraphs(),
  mp3Link: faker.internet.url()
});

const generatePodcasts = R.times(makePodcast);
const generateEpisodes =
  R.curry((pod, num) => R.times(makeEpisode.bind(null, pod), num));
