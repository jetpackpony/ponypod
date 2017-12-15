process.env.NODE_ENV = 'test';

const {
  writePodcast,
  writeEpisodes
} = require('../../rssWorker/dbOperations');
const chai = require('chai');
const expect = chai.expect;
const Podcast = require('../../models/podcast').model;
const Episode = require('../../models/episode').model;


describe('writePodcast', () => {
  let podcast;
  before(() => Promise.all([
    Podcast.remove({}),
    Episode.remove({})
  ]));
  beforeEach(() =>
    Podcast
    .create({ title: "test" })
    .then((p) => podcast = p)
  );
  afterEach(() => Promise.all([
    Podcast.remove({}),
    Episode.remove({})
  ]));

  describe('writePodcast', () => {
    it('updates a podcast in the database', () => (
      writePodcast(podcast, { title: "new title" })
        .then((pod) => (
          expect(pod.title).to.eql("new title")
        ))
    ));
  });

  describe('writeEpisodes', () => {
    it('adds episodes to database linking with podcast', () => (
      writeEpisodes([
        { podcast: podcast._id, guid: "1-Frist" },
        { podcast: podcast._id, guid: "2-Second" }
      ]).then((bulkOp) => {
        expect(bulkOp.isOk()).to.eql(true);
        expect(bulkOp.nUpserted).to.eql(2);
      })
    ));
    it('updates existing episodes', () => (
      Episode
      .create({ podcast: podcast._id, title: "old title", guid: "2-Second" })
      .then(() => (
        writeEpisodes([
          { podcast: podcast._id, guid: "1-Frist" },
          { podcast: podcast._id, title: "new title", guid: "2-Second" }
        ])
      ))
      .then((bulkOp) => {
        expect(bulkOp.isOk()).to.eql(true);
        expect(bulkOp.nUpserted).to.eql(1);
        expect(bulkOp.nModified).to.eql(1);
      })
    ));
  });
});
