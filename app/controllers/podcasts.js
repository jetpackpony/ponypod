const router = require('express').Router();
const mongoose = require('mongoose');
const Podcast = mongoose.model('Podcast');
const {
  parsePageParams,
  buildSearchObject
} = require('../utils');

const podcastsPerPage = 30;
const paramsToSearch = ['title', 'summary', 'description'];
const minSearchLength = 3;

router.get('/', (req, res) => {
  const {
    pageNum,
    pageSize
  } = parsePageParams(req.query.page, podcastsPerPage);

  Podcast
    .find(
      buildSearchObject(
        req.query.search,
        paramsToSearch,
        minSearchLength
      )
    )
    .skip(pageNum * pageSize)
    .limit(pageSize || podcastsPerPage)
    .sort('title')
    .exec((err, records) => {
      if (err) return console.error(err);
      res.json(records);
    });

});

module.exports = router;

