const moment = require('moment');
const R = require('ramda');

const paginationPodcast = {
  "title": "Pagination Podcast"
};

const paginationEpisodes = [
  { "title":"Second", "publishedAt": moment().subtract(2, 'd') },
  { "title":"Third", "publishedAt": moment().subtract(3, 'd') },
  { "title":"Fifth", "publishedAt": moment().subtract(5, 'd') },
  { "title":"Latest", "publishedAt": moment().subtract(1, 'd') },
  { "title":"Fourth", "publishedAt": moment().subtract(4, 'd') }
];

const makeTestEpisodes =
  (pod) => paginationEpisodes.map(R.assoc('podcast', pod))

module.exports = {
  paginationPodcast,
  paginationEpisodes,
  makeTestEpisodes
};
