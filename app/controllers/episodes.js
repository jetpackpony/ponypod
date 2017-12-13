'use strict';

const R = require('ramda');
const router = require('express').Router();
const Episode = require('mongoose').model('Episode');
const { presenter } = require('../../models/episode');
const {
  queryModel,
  searchPaginationRequest,
  sendJSON
} = require('../middleware/searchPaginationRequest');
const {
  queryRecordByID,
  recordByIDRequest
} = require('../middleware/recordByIDRequest');


// BEGIN setup middleware
const extractPodcastID =
  (req, res, next) => {
    req.queryParams = {
      podcast: req.query.podcast_id
    };
    next();
  };

const extractEpisodeID =
  (req, res, next) => {
    req.queryParams = {
      _id: req.params.episodeId
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

const getEpisodeByID =
  recordByIDRequest(
    queryRecordByID({
      Model: Episode,
      fieldsToPopulate: ['podcast']
    })
  );

const sendEpisodesJSON = sendJSON(presenter);
// END setup middleware


router.get('/',
            extractPodcastID,
            queryEpisodes,
            sendEpisodesJSON);

router.get('/:episodeId',
            extractEpisodeID,
            getEpisodeByID,
            sendEpisodesJSON);

module.exports = router;
