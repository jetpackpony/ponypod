process.env.NODE_ENV = 'test';

const moment = require('moment');
const {
  parseFeed,
  parseDuration,
  extractSummary
} = require('../../rssWorker/parseFeed');
const chai = require('chai');
const expect = chai.expect;
const Podcast = require('../../models/podcast').model;
const testFeed = require('../testData/testFeed-hello.json');

describe('parseFeed', () => {
  let podcast;
  beforeEach(() =>
    Podcast
    .create({ title: "test" })
    .then((p) => podcast = p)
  );
  afterEach(() => Podcast.remove({}));

  it('should return correct podcast data', () => {
    expect(
      parseFeed(podcast, testFeed).podcastData
    ).to.be.eql({
      title: "Hello Internet",
      description: "CGP Grey and Brady Haran talk about YouTube, life, work, whatever.",
      image: "http://static1.squarespace.com/Hello+Internet.003.png",
      summary: "CGP Grey and Brady Haran talk about YouTube, life, work, whatever.",
    });
  });
  it('should return correct episodes data', () => {
    expect(
      parseFeed(podcast, testFeed).episodesData
    ).to.be.eql([
      {
        podcast: podcast._id,
        guid: "52d66949e4b0a8cec3bcdd46",
        title: "1-First episode",
        publishedAt: moment("Thu, 30 Nov 2017 20:33:49 +0000").toDate(),
        duration: 6692,
        summary: "First episode - First paragraph of description",
        fullDescription: "\n\n\n\n<p>First episode - First paragraph of description</p>\n<h2 id=\"sponsors-\">Sponsors:</h2>\n<p><a href=\"https://www.squarespace.com/hello\">Some link</a></p>\n\n",
        mp3Link: "http://hellointernet/HI_93_Export_4.mp3"
      },
      {
        podcast: podcast._id,
        guid: "52d66949e4b0a8cec3bcdd46",
        title: "2-Second episode",
        publishedAt: moment("Fri, 24 Nov 2017 22:20:12 +0000").toDate(),
        duration: 3222,
        summary: "Second Episode - First paragrhaph of second episode",
        fullDescription: "\n\n\n\n<p>Second Episode - First paragrhaph of <em>second</em> episode</p>\n<h2 id=\"sponsors-\">Sponsors:</h2>\n<p><a href=\"http://backblaze.com/hellointernet\">Some HTML</a></p>\n\n",
        mp3Link: "http://hellointernet/HI92.mp3"
      }
    ]);
  });
});

describe('parseDuration', () => {
  it('parses hh:mm:ss duration', () => {
    expect(parseDuration('01:54:21')).to.eql(6861);
  });
  it('parses mm:ss duration', () => {
    expect(parseDuration('30:01')).to.eql(1801);
  });
  it('parses ss duration', () => {
    expect(parseDuration('00:44')).to.eql(44);
  });
});

describe('extractSummary', () => {
  const withPar = "\n\n\n\n<p>Second Episode - First paragrhaph of <em>second</em> episode</p>\n<h2 id=\"sponsors-\">Sponsors:</h2>\n<p><a href=\"http://backblaze.com/hellointernet\">Some HTML</a></p>\n\n";
  const firstPar = "Second Episode - First paragrhaph of second episode";
  const withoutPar = "First paragraph Second episode of description stripped from HTML tags";

  it('returns first paragraph if there is one', () => {
    expect(extractSummary(withPar)).to.eql(firstPar);
  });
  it('returns the whole summary if there are no paragraphs', () => {
    expect(extractSummary(withoutPar)).to.eql(withoutPar);
  });
});

