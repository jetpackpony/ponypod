'use strict';

const R = require('ramda');
const router = require('express').Router();
const Podcast = require('mongoose').model('Podcast');
const { presenter } = require('../../models/podcast');
const {
  renderRecord
} = require('../utils');
const {
  queryModel,
  searchPaginationRequest,
  sendJSON
} = require('../middleware/searchPaginationRequest');

const queryPodcasts =
  searchPaginationRequest(
    queryModel({
      Model: Podcast,
      itemsPerPage: 30,
      paramsToSearch: ['title', 'summary', 'description'],
      minSearchLength: 3,
      fieldsToPopulate: [],
      sortBy: 'title'
    })
  );

const sendPodcastsJSON = sendJSON(presenter);

router.get(
  '/',
  queryPodcasts,
  sendPodcastsJSON
);



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
