'use strict';

const R = require('ramda');
const router = require('express').Router();
const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.ObjectId;
const Episode = mongoose.model('Episode');
const { presenter } = require('../../models/episode');
const {
  parsePageParams,
  buildSearchObject,
  renderRecords
} = require('../utils');

const episodesPerPage = 10;
const paramsToSearch = ['title', 'summary', 'fullDescription'];
const minSearchLength = 3;

router.get('/', (req, res) => {
  const {
    pageNum,
    pageSize
  } = parsePageParams(req.query.page, episodesPerPage);
  const podcast = req.query.podcast_id;

  Promise.all([
    Episode
    .find(
      R.merge(
        buildSearchObject(
          req.query.search,
          paramsToSearch,
          minSearchLength
        ),
        {
          podcast
        }
      )
    )
    .skip(pageNum * pageSize)
    .limit(pageSize || episodesPerPage)
    .sort({ publishedAt: -1 })
    .exec(),
    Episode
    .count(
      R.merge(
        buildSearchObject(
          req.query.search,
          paramsToSearch,
          minSearchLength
        ),
        {
          podcast
        }
      )
    )
    .exec()
  ])
    .then(([records, count]) => {
      res.json(renderRecords(presenter, records, Math.ceil(count / pageSize)));
    })
    .catch((err) => {
      console.error(err);
    })
});

module.exports = router;
