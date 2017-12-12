const {
  parsePageParams,
  buildSearchObject,
  recordToJSON
} = require('../app/utils');

const chai = require('chai');
const expect = chai.expect;
const Podcast = require('../models/podcast').model;
const Episode = require('../models/episode').model;

describe('utils', () => {
  describe('parsePageParams', () => {
    const defaults = { pageNum: 0, pageSize: 30 };
    it('returns defaults when nothing specified', () => {
      expect(
        parsePageParams(null, defaults.pageSize)
      ).to.eql(defaults);
    });
    it('parses values correctly', () => {
      expect(
        parsePageParams({ number: '3', size: '5' }, defaults.pageSize)
      ).to.eql({ pageNum: 3, pageSize: 5 });
    });
    it('returns defaults when params are unparsable', () => {
      expect(
        parsePageParams({ number: 'test', size: 'me' }, defaults.pageSize)
      ).to.eql(defaults);
    });
  });

  describe('buildSearchObject', () => {
    it('returns search object for every param', () => {
      expect(
        buildSearchObject('SEArch', ['title', 'desc'])
      ).to.eql({
        "$or": [
          { "title": /search/i },
          { "desc":/search/i }
        ]
      });
    });
    it('returns null if search term is empty', () => {
      expect(buildSearchObject('', ['title'])).to.eql(null);
    });
    it('returns null if search term is undefined', () => {
      expect(buildSearchObject(undefined, ['title'])).to.eql(null);
    });
    it('returns null if search term is too short', () => {
      expect(buildSearchObject('se', ['title'])).to.eql(null);
    });
  });

  describe('recordToJSON', () => {
    it('returns a correct object', () => {
      let rec = new Podcast({ title: "test" });
      expect(
        recordToJSON(rec)
      ).to.include({ title: "test", id: rec._id.toString() });
    });
    it('returns a correct object with populated record', () => {
      let podcast = new Podcast({ title: "podcast" });
      let episode = new Episode({ title: "episode", podcast });
      let json = recordToJSON(episode);
      expect(json).to.include({ title: "episode" });
      expect(json.podcast).to.include({ title: "podcast" });
    });
  });
});
