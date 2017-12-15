const R = require('ramda');
const seeder = require('mongoose-seed');
const config = require('./config');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const {
  getModelsFiles
} = require('./app/utils');
const {
  model: Podcast
} = require('./models/podcast');

console.log(`Connecting to ${config.get('MONGO_URL')}`);
seeder.connect(config.get('MONGO_URL'), () => {
  seeder.loadModels(getModelsFiles());
  seeder.clearModels(['Podcast', 'Episode'], () => {
    seeder.populateModels([{
      model: 'Podcast',
      documents: [
        { rssLink: 'http://www.hellointernet.fm/podcast?format=rss' },
        { rssLink: 'http://www.howstuffworks.com/podcasts/stuff-you-should-know.rss' },
        { rssLink: 'http://feeds.feedburner.com/freakonomicsradio' },
        { rssLink: 'http://podster.fm/rss.xml?pid=313' },
        { rssLink: 'http://atp.fm/episodes?format=rss' },
        { rssLink: 'http://golangshow.com/index.xml' }
      ]
    }], seeder.disconnect);
  });
});

