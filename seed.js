const R = require('ramda');
const faker = require('faker');
const seeder = require('mongoose-seed');
const config = require('./config');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const {
  getModelsFiles,
  getRandomInt
} = require('./app/utils');
const {
  model: Podcast,
  generator: generatePodcasts
} = require('./models/podcast');
const {
  model: Episode,
  generator: generateEpisodes
} = require('./models/episode');

const numPodcasts = 70;
const minEpisodes = 1;
const maxEpisodes = 50;

const randEpisodeCount =
  getRandomInt.bind(null, minEpisodes, maxEpisodes);

console.log(`Connecting to ${config.get('MONGO_URL')}`);
seeder.connect(config.get('MONGO_URL'), () => {
  seeder.loadModels(getModelsFiles());
  seeder.clearModels(['Podcast', 'Episode'], () => {
    seeder.populateModels([{
      model: 'Podcast',
      documents: generatePodcasts(numPodcasts)
    }], () => {
      Podcast.find({}).exec((err, podcasts) => {
        if (err) {
          console.err(err);
          return;
        }
        seeder.populateModels([{
          model: 'Episode',
          documents: R.flatten(podcasts.map(
            generateEpisodes(randEpisodeCount())
          ))
        }], seeder.disconnect);
      });
    });
  });
});

