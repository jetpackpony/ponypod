process.env.NODE_ENV = 'test';

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
  makeTestEpisodes,
  makeSearchEpisodes
} = require('./episodesTestData');

chai.use(chaiHttp);

const apiEndpoint = config.get('API_ENDPOINT');
const getItems = (res) => res.body.data;

describe('GET /episodes', () => {
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
        Episode.create(makeTestEpisodes(podcast));
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
    let podcastId;
    beforeEach(() => (
      Podcast
      .create(paginationPodcast)
      .then((podcast) => {
        podcastId = podcast._id.toString();
        Episode.create(makeSearchEpisodes(podcast));
      })
    ));
    after(() => Promise.all([
      Podcast.remove({}),
      Episode.remove({})
    ]));

    it('returns episodes filtered by search term',
      (done) => {
        chai.request(app)
          .get(`${apiEndpoint}/episodes`)
          .query({
            'podcast_id': podcastId,
            search: 'search me'
          })
          .end((err, res) => {
            expect(err).to.be.null;
            expect(getItems(res)).to.be.an('array');
            expect(
              getItems(res).length,
              'should return 3 items'
            ).to.eql(3);
            done();
          });
      }
    );
    it('returns zero results if nothing is found',
      (done) => {
        chai.request(app)
          .get(`${apiEndpoint}/episodes`)
          .query({
            'podcast_id': podcastId,
            search: 'asdfasdf'
          })
          .end((err, res) => {
            expect(err).to.be.null;
            expect(getItems(res)).to.be.an('array');
            expect(
              getItems(res).length,
              'should return 0 items'
            ).to.eql(0);
            done();
          });
      }
    );
    it('returns unfiltered results if search term is too short',
      (done) => {
        chai.request(app)
          .get(`${apiEndpoint}/episodes`)
          .query({
            'podcast_id': podcastId,
            search: 'as'
          })
          .end((err, res) => {
            expect(err).to.be.null;
            expect(getItems(res)).to.be.an('array');
            expect(
              getItems(res).length,
              'should return all 5 items'
            ).to.eql(5);
            done();
          });
      }
    );
  });

  describe('get single episode', () => {
    let episodeId;
    beforeEach(() => (
      Podcast
      .create(paginationPodcast)
      .then((podcast) => (
        Episode.create(makeTestEpisodes(podcast))
      ))
      .then((episodes) => episodeId = episodes[0]._id.toString())
    ));
    after(() => Promise.all([
      Podcast.remove({}),
      Episode.remove({})
    ]));

    it('returns an episode by id',
      (done) => {
        chai.request(app)
          .get(`${apiEndpoint}/episodes/${episodeId}`)
          .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res).to.be.json;
            expect(getItems(res)).to.be.an('object');
            expect(getItems(res).attributes.title)
              .to.eql(paginationEpisodes[0].title);
            expect(getItems(res).attributes['published-at'])
              .to.eql(paginationEpisodes[0].publishedAt.format());
            done();
          });
      }
    );
    it('includes episodes\' podcast in payload',
      (done) => {
        chai.request(app)
          .get(`${apiEndpoint}/episodes/${episodeId}`)
          .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res).to.be.json;
            expect(getItems(res).relationships.podcast).to.be.an('object');
            expect(res.body.included).to.be.an('array');
            expect(res.body.included[0].attributes.title)
              .to.eql(paginationPodcast.title);
            done();
          });
      }
    );
    it('returns error if the episode doesn\'t exist',
      (done) => {
        chai.request(app)
          .get(`${apiEndpoint}/episodes/asdf`)
          .end((err) => {
            expect(err).not.to.be.null;
            expect(err.status).to.eql(404);
            done();
          });
      }
    );
  });
});
