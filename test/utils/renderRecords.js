const {
  renderRecords,
  renderRecord,
  recordToJSON,
  updateValue,
  updateRecordFields,
  toJSON
} = require('../../app/utils/renderRecords');
const expect = require('chai').expect;
const moment = require('moment');
const Podcast = require('../../models/podcast').model;
const Episode = require('../../models/episode').model;

describe('renderRecords', () => {
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
  it('converts dates correctly', () => {
    let date = moment();
    let episode = new Episode({
      title: "episode",
      publishedAt: date
    });
    let json = recordToJSON(episode);
    expect(json).to.include({ "published-at": date.format() });
  });
});
