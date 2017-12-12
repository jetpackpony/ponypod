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

router.get('/', (req, res, next) => {
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
      next(err);
    })
});

router.get('/:podcastId', (req, res, next) => {
  Podcast
    .find({ _id: req.params.podcastId })
    .exec()
    .then(([record]) => {
      (record)
        ? res.json(renderRecord(presenter, record))
        : next({ message: 'not found' })
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
