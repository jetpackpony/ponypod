process.env.NODE_ENV = 'test';

const R = require('ramda');
const mongoose = require('mongoose');
const makeId = mongoose.Types.ObjectId;
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const app = require('../app.js');
const config = require('../config');
const Podcast = require('../models/podcast').model;
const Episode = require('../models/episode').model;
const {
  paginationPodcast,
  paginationEpisodes,
  makeTestEpisodes
} = require('./episodesTestData');

chai.use(chaiHttp);

const apiEndpoint = config.get('API_ENDPOINT');
const getItems = (res) => res.body.data;

describe('GET /podcasts', () => {
  before(() => Promise.all([
    Podcast.remove({}),
    Episode.remove({})
  ]));
  after(() => Promise.all([
    Podcast.remove({}),
    Episode.remove({})
  ]));

  describe('pagination', () => {
    let podcastId;
    beforeEach(() => (
      Podcast
      .create(paginationPodcast)
      .then((podcast) => {
        podcastId = podcast._id.toString();
        Episode.create(makeTestEpisodes(podcast))
      })
    ));
    after(() => Promise.all([
      Podcast.remove({}),
      Episode.remove({})
    ]));

    it('returns first page when page is not specified',
      (done) => {
        chai.request(app)
          .get(`${apiEndpoint}/episodes`)
          .query({ 'podcast_id': podcastId })
          .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res).to.be.json;
            expect(getItems(res)).to.be.an('array');
            expect(
              getItems(res)[0].attributes.title,
              'first returned item should be "Latest"'
            ).to.eql("Latest");
            done();
          });
      }
    );
    it('returns first page of episodes',
      (done) => {
        chai.request(app)
          .get(`${apiEndpoint}/episodes`)
          .query({
            'podcast_id': podcastId,
            'page[number]': '0',
            'page[size]': '3'
          })
          .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res).to.be.json;
            expect(getItems(res)).to.be.an('array');
            expect(
              getItems(res).length,
              'should return 3 items'
            ).to.eql(3);
            expect(
              getItems(res)[0].attributes.title,
              'first returned item should be "Latest"'
            ).to.eql("Latest");
            done();
          });
      }
    );
    it('returns second page of episodes',
      (done) => {
        chai.request(app)
          .get(`${apiEndpoint}/episodes`)
          .query({
            'podcast_id': podcastId,
            'page[number]': '1',
            'page[size]': '3'
          })
          .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res).to.be.json;
            expect(getItems(res)).to.be.an('array');
            expect(
              getItems(res).length,
              'should return 2 items'
            ).to.eql(2);
            expect(
              getItems(res)[0].attributes.title,
              'first returned item should be "Fourth"'
            ).to.eql("Fourth");
            done();
          });
      }
    );
    it('returns the correct total pages count',
      (done) => {
        let perPage = 3;
        let totalPages = Math.ceil(paginationEpisodes.length / perPage);
        chai.request(app)
          .get(`${apiEndpoint}/episodes`)
          .query({
            'podcast_id': podcastId,
            'page[number]': '0',
            'page[size]': perPage
          })
          .end((err, res) => {
            expect(err).to.be.null;
            expect(res.body.meta.totalPages).to.eql(totalPages);
            done();
          });
      }
    );
    it('returns an error if no podcast_id is specified',
      (done) => {
        chai.request(app)
          .get(`${apiEndpoint}/episodes`)
          .end((err, res) => {
            expect(err).to.be.null;
            expect(getItems(res).length).to.eql(0);
            expect(res.body.meta.totalPages).to.eql(0);
            done();
          });
      }
    );
  });

  describe('search', () => {
    it('returns episodes filtered by search term')
    it('returns zero results if nothing is found')
    it('returns unfiltered results if search term is too short')


  });

  describe('get single episode', () => {
    it('returns an episode by id');
    it('includes episodes\' podcast in payload');
    it('returns error if the episode doesn\'t exist');
  });
});
