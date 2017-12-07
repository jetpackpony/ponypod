process.env.NODE_ENV = 'test';

const mongoose = require('mongoose');
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const app = require('../app.js');
const Podcast = require('../models/podcast');
const testData = require('./podcastsTestData');

chai.use(chaiHttp);

describe('GET /podcasts', () => {
  before(() => Podcast.remove({}));
  beforeEach(() => Podcast.create(testData));
  afterEach(() => Podcast.remove({}));

  it('should return first page when page is not specified', (done) => {
    chai.request(app)
      .get('/podcasts')
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an('array');
        expect(
          res.body[0].title,
          'first returned item should be "1-First"'
        ).to.eql("1-First");
        done();
      });
  });
  it('should return the first page of podcasts', (done) => {
    chai.request(app)
      .get('/podcasts')
      .query({ 'page[number]':'0', 'page[size]':'3' })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an('array');
        expect(res.body.length, 'should return 3 items').to.eql(3);
        expect(
          res.body[0].title,
          'first returned item should be "1-First"'
        ).to.eql("1-First");
        done();
      });
  });
  it('should return the second page of podcasts', (done) => {
    chai.request(app)
      .get('/podcasts')
      .query({ 'page[number]':'1', 'page[size]':'3' })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an('array');
        expect(res.body.length, 'should return 2 items').to.eql(2);
        expect(
          res.body[0].title,
          'first returned item should be "4-Forth"'
        ).to.eql("4-Forth");
        done();
      });
  });

  it('should filter podcasts by search term');

  it('should return a podcast by id');
  it('should error if podcast doesn\'t exist');
});
