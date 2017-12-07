const router = require('express').Router();
const mongoose = require('mongoose');
const Podcast = mongoose.model('Podcast');
const { parsePageParams } = require('../utils');

const podcastsPerPage = 30;

router.get('/', (req, res) => {
  const { pageNum, pageSize } = parsePageParams(req.query.page, podcastsPerPage);
  Podcast
    .find()
    .skip(pageNum * pageSize)
    .limit(pageSize || podcastsPerPage)
    .sort('title')
    .exec((err, records) => {
      if (err) return console.error(err);
      res.json(records);
    });

});

module.exports = router;

