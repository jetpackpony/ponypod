const R = require('ramda');
const faker = require('faker');
const seeder = require('mongoose-seed');
const config = require('./config');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const { getModelsFiles } = require('./app/utils');
const {
  model: Podcast,
  generator: generatePodcasts
} = require('./models/podcast');
const {
  model: Episode,
  generator: generateEpisodes
} = require('./models/episode');

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

