const R = require('ramda');
const faker = require('faker');

const guids = R.times(R.identity, 2);

const getPodcastDataFromFeed =
  R.curry((podcast, feed) => ({
    title: faker.company.companyName(),
    image: faker.internet.avatar(),
    summary: faker.lorem.paragraph(),
    description: faker.lorem.paragraphs(),
  }));

const getEpisodesDataFromFeed =
  R.curry((podcast, feed) => guids.map((guid) => ({
    podcast,
    guid: `${podcast._id.toString()}_${guid + 1}`,
    title: faker.company.companyName(),
    publishedAt: faker.date.past(),
    duration: faker.random.number(),
    summary: faker.lorem.paragraph(),
    fullDescription: faker.lorem.paragraphs(),
    mp3Link: faker.internet.url()
  })));

const parseFeed =
  R.curry((podcast, feed) => ({
    podcastData: getPodcastDataFromFeed(podcast, feed),
    episodesData: getEpisodesDataFromFeed(podcast, feed)
  }));

module.exports = {
  parseFeed
};
