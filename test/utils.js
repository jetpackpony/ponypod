const {
  parsePageParams,
  buildSearchObject
} = require('../app/utils');

const chai = require('chai');
const expect = chai.expect;

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
});
