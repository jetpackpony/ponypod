process.env.NODE_ENV = 'test';

const mongoose = require('mongoose');
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const app = require('../app.js');
const Podcast = require('../models/podcast');

chai.use(chaiHttp);

describe('/podcasts', () => {
  beforeEach((done) => {
    Podcast.remove({}, (err) => {
      done();
    });
  });

  describe('GET /', () => {
    it('should return all podcasts', (done) => {
      chai.request(app)
        .get('/')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
          done();
        });
    });
  });
});
