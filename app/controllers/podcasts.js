const R = require('ramda');
const router = require('express').Router();
const Podcast = require('mongoose').model('Podcast');
const { presenter } = require('../../models/podcast');
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

const extractPodcastID =
  (req, res, next) => {
    req.queryParams = {
      _id: req.params.podcastId
    };
    next();
  };

const getPodcastByID =
  recordByIDRequest(
    queryRecordByID({
      Model: Podcast
    })
  );

const sendPodcastsJSON = sendJSON(presenter);
// END setup middleware

router.get('/',
            queryPodcasts,
            sendPodcastsJSON);

router.get('/:podcastId',
            extractPodcastID,
            getPodcastByID,
            sendPodcastsJSON);

module.exports = router;
