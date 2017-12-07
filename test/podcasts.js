process.env.NODE_ENV = 'test';

const mongoose = require('mongoose');
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const app = require('../app.js');
const Podcast = require('../models/podcast');
const testData = require('./podcastsTestData');

chai.use(chaiHttp);

describe('/podcasts', () => {
  before((done) => {
    Podcast.remove({}, (err) => {
      done();
    });
  });
  before((done) => {
    Podcast.create(testData, (err) => {
      done();
    });
  });
  after((done) => {
    Podcast.remove({}, (err) => {
      done();
    });
  });

  describe('GET /podcasts', () => {
    it('should return the first page of podcasts', (done) => {
      chai.request(app)
        .get('/podcasts')
        .query({ 'page[number]':'0', 'page[size]':'3' })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.be.an('array');
          expect(res.body.length).to.eql(3);
          expect(res.body.first.title).to.eql("First");
          done();
        });
    });
    it('should return the second page of podcasts');

    it('should return first page when page is not specified');
    it('should filter podcasts by search term');

    it('should return a podcast by id');
    it('should error if podcast doesn\'t exist');
  });
});
