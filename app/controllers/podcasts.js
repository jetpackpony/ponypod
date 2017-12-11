'use strict';

const R = require('ramda');
const router = require('express').Router();
const mongoose = require('mongoose');
const Podcast = mongoose.model('Podcast');
const { presenter } = require('../../models/podcast');
const {
  parsePageParams,
  buildSearchObject,
  renderRecords,
  renderRecord
} = require('../utils');

const podcastsPerPage = 30;
const paramsToSearch = ['title', 'summary', 'description'];
const minSearchLength = 3;

router.get('/', (req, res) => {
  const {
    pageNum,
    pageSize
  } = parsePageParams(req.query.page, podcastsPerPage);

  Promise.all([
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
    .exec(),
    Podcast
    .count(
      buildSearchObject(
        req.query.search,
        paramsToSearch,
        minSearchLength
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

router.get('/:podcastId', (req, res) => {
  Podcast
    .find({ _id: req.params.podcastId })
    .exec()
    .then(([record]) => {
      res.json(renderRecord(presenter, record));
    })
    .catch((err) => {
      console.error(err);
    });
});

module.exports = router;
