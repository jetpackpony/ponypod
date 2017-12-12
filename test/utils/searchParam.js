const {
  buildSearchObject
} = require('../../app/utils/searchParam');
const expect = require('chai').expect;

describe('searchParam', () => {
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
