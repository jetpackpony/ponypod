'use strict';

const R = require('ramda');
const router = require('express').Router();
const Episode = require('mongoose').model('Episode');
const { presenter } = require('../../models/episode');
const {
  renderRecord
} = require('../utils');
const {
  queryModel,
  searchPaginationRequest,
  sendJSON
} = require('../middleware/searchPaginationRequest');

const extractPodcastID =
  (req, res, next) => {
    req.queryParams = {
      podcast: req.query.podcast_id
    };
    next();
  };

const queryEpisodes =
  searchPaginationRequest(queryModel({
    Model: Episode,
    itemsPerPage: 10,
    paramsToSearch: ['title', 'summary', 'fullDescription'],
    minSearchLength: 3,
    fieldsToPopulate: ['podcast'],
    sortBy: { publishedAt: -1 }
  }));

const sendEpisodesJSON = sendJSON(presenter);

router.get(
  '/',
  extractPodcastID,
  queryEpisodes,
  sendEpisodesJSON
);



router.get('/:episodeId', (req, res, next) => {
  Episode
    .find({ _id: req.params.episodeId })
    .populate('podcast')
    .exec()
    .then(([record]) => {
      res.json(renderRecord(presenter, record));
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
