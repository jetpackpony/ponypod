const seeder = require('mongoose-seed');
const config = require('./config');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const {
  getModelsFiles
} = require('./app/utils');
const seedData = require('./seedData.json');

console.log(`Connecting to ${config.get('MONGO_URL')}`);
seeder.connect(config.get('MONGO_URL'), () => {
  seeder.loadModels(getModelsFiles());
  seeder.clearModels(['Podcast', 'Episode'], () => {
    seeder.populateModels([{
      model: 'Podcast',
      documents: seedData.map((url) => ({ rssLink: url }))
    }], seeder.disconnect);
  });
});

