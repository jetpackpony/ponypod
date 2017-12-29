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
const searchEpisodes = [
  { "title":"Second" },
  { "title":"Third" },
  { "title":"Fifth Search Me" },
  { "title":"Latest", "summary":"This is search me in summary" },
  { "title":"Fourth", fullDescription: "Search Me id desc" }
];

const makeTestEpisodes =
  (pod) => paginationEpisodes.map(R.assoc('podcast', pod));

const makeSearchEpisodes =
  (pod) => searchEpisodes.map(R.assoc('podcast', pod));

module.exports = {
  paginationPodcast,
  paginationEpisodes,
  makeTestEpisodes,
  makeSearchEpisodes
};
