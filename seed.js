const R = require('ramda');
const fs = require('fs');
const path = require('path');
const faker = require('faker');
const seeder = require('mongoose-seed');
const config = require('./config');

seeder.connect(config.get('MONGO_URL'), () => {
  const models = path.join(__dirname, 'models');
  seeder.loadModels(
    fs.readdirSync(models)
      .filter((file) => ~file.indexOf('.js'))
      .map((file) => path.join(models, file))
  );

  seeder.clearModels(['Podcast'], () => (
    seeder.populateModels([{
      model: 'Podcast',
      documents: generatePodcasts(70)
    }], seeder.disconnect)
  ));
});

const generateModels =
  R.curry((generator, num) => R.times(generator, num));

const makePodcast = () => ({
  title: faker.company.companyName(),
  image: faker.internet.avatar(),
  summary: faker.lorem.paragraph(),
  description: faker.lorem.paragraphs(),
  rssLink: faker.internet.url()
});

const generatePodcasts = generateModels(makePodcast);
