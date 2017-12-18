const seeder = require('mongoose-seed');
const config = require('./config');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const {
  getModelsFiles
} = require('./app/utils');

console.log(`Connecting to ${config.get('MONGO_URL')}`);
seeder.connect(config.get('MONGO_URL'), () => {
  seeder.loadModels(getModelsFiles());
  seeder.clearModels(['Podcast', 'Episode'], () => {
    seeder.populateModels([{
      model: 'Podcast',
      documents: [
        { rssLink: 'http://www.hellointernet.fm/podcast?format=rss' },
        { rssLink: 'http://www.howstuffworks.com/podcasts/stuff-you-should-know.rss' },
        { rssLink: 'http://feeds.feedburner.com/freakonomicsradio' },
        { rssLink: 'http://podster.fm/rss.xml?pid=313' },
        { rssLink: 'http://atp.fm/episodes?format=rss' },
        { rssLink: 'http://golangshow.com/index.xml' },
        { rssLink: 'http://feedpress.me/futilitycloset' },
        { rssLink: 'https://feeds.transistor.fm/the-good-news-podcast' },
        { rssLink: 'http://feeds.feedburner.com/ear-biscuits' },
        { rssLink: 'https://www.ridiculoushistoryshow.com/podcasts/ridiculous-history.rss' },
        { rssLink: 'https://www.relay.fm/cortex/feed' },
        { rssLink: 'http://feeds.gimletmedia.com/hearstartup' },
        { rssLink: 'http://feed.thisamericanlife.org/talpodcast' },
        { rssLink: 'https://youarenotsosmart.com/feed/' },
        { rssLink: 'https://feeds.feedburner.com/SoftSkillsEngineering' },
        { rssLink: 'https://www.npr.org/rss/podcast.php?id=510298' },
        { rssLink: 'http://feeds.gimletmedia.com/hearreplyall' },
        { rssLink: 'http://feeds.gimletmedia.com/homecomingshow' },
        { rssLink: 'http://feeds.gimletmedia.com/crimetownshow' },
        { rssLink: 'http://feeds.gimletmedia.com/eltshow' },
        { rssLink: 'http://feeds.gimletmedia.com/heavyweightpodcast' },
        { rssLink: 'http://feeds.gimletmedia.com/mogulshow' },
        { rssLink: 'http://feeds.gimletmedia.com/samplershow' },
        { rssLink: 'http://feeds.gimletmedia.com/sciencevs' },
        { rssLink: 'http://feeds.gimletmedia.com/thenodshow' },
        { rssLink: 'http://feeds.gimletmedia.com/thepitchshow' },
        { rssLink: 'http://feeds.gimletmedia.com/twiceremovedshow' },
        { rssLink: 'http://feeds.gimletmedia.com/undoneshow' },
        { rssLink: 'http://feeds.gimletmedia.com/uncivil' },
        { rssLink: 'https://www.npr.org/rss/podcast.php?id=510307' },
        { rssLink: 'https://www.npr.org/rss/podcast.php?id=510289' },
        { rssLink: 'https://www.npr.org/rss/podcast.php?id=510308' },
        { rssLink: 'https://www.npr.org/rss/podcast.php?id=510318' },
        { rssLink: 'https://www.npr.org/rss/podcast.php?id=510313' },
        { rssLink: 'https://www.npr.org/rss/podcast.php?id=510312' },
        { rssLink: 'https://www.npr.org/rss/podcast.php?id=510317' },
        { rssLink: 'https://www.npr.org/templates/rss/podcast.php?id=510052' },
        { rssLink: 'https://www.npr.org/templates/rss/podcast.php?id=510053' },
        { rssLink: 'https://www.npr.org/rss/podcast.php?id=381444908' },
        { rssLink: 'https://www.npr.org/rss/podcast.php?id=510309' },
        { rssLink: 'https://www.npr.org/templates/rss/podcast.php?id=510051' },
        { rssLink: 'https://www.npr.org/templates/rss/podcast.php?id=510056' },
        { rssLink: 'https://www.npr.org/rss/podcast.php?id=510323' },
        { rssLink: 'http://feeds.serialpodcast.org/serialpodcast' },
        { rssLink: 'http://feeds.wnyc.org/radiolab' },
        { rssLink: 'http://wtfpod.libsyn.com/rss' },
        { rssLink: 'http://feeds.feedburner.com/RevisionistHistory' },
        { rssLink: 'http://feeds.stownpodcast.org/stownpodcast' },
        { rssLink: 'http://feeds.feedburner.com/thisismynextpodcast' },
        { rssLink: 'http://rss.art19.com/tim-ferriss-show' },
        { rssLink: 'http://podcasts.files.bbci.co.uk/p02nq0lx.rss' },
        { rssLink: 'http://feeds.wnyc.org/moreperfect' },
        { rssLink: 'http://podcasts.files.bbci.co.uk/p02tb8vq.rss' },
        { rssLink: 'http://feeds.feedburner.com/aroundbroadway' },
        { rssLink: 'http://feeds.wnyc.org/deathsexmoney' },
        { rssLink: 'http://feed.songexploder.net/songexploder' },
        { rssLink: 'http://feeds.wnyc.org/indivisibleradio' },
        { rssLink: 'http://feeds.wnyc.org/wnycheresthething' },
        { rssLink: 'http://feeds.feedburner.com/jazzloftradioseries' },
        { rssLink: 'http://feeds.feedburner.com/SlatePoliticalGabfest' },
        { rssLink: 'http://feeds.feedburner.com/SlateMagazineDailyPodcast' },
        { rssLink: 'http://feeds.feedburner.com/SlateHangUpAndListen' },
        { rssLink: 'http://feeds.feedburner.com/slateamicuswithdahlialithwick' },
        { rssLink: 'http://feeds.feedburner.com/SlatesWhistlestop' },
        { rssLink: 'http://feeds.feedburner.com/SlateMomAndDadAreFighting' },
        { rssLink: 'http://feeds.feedburner.com/TheGistWithMikePesca' },
        { rssLink: 'http://imsorrydad.libsyn.com/rss' },
        { rssLink: 'http://feeds.feedburner.com/SlatesWorking' },
        { rssLink: 'http://feeds.feedburner.com/SlateLexiconValley' },
        { rssLink: 'http://feeds.feedburner.com/the-moment' },
        { rssLink: 'http://feeds.feedburner.com/SlateCultureGabfest' },
        { rssLink: 'http://feeds.feedburner.com/DoubleXPodcasts' },
        { rssLink: 'http://feeds.feedburner.com/SlatesRepresent' },
        { rssLink: 'http://feeds.feedburner.com/slatemoney' },
        { rssLink: 'http://feeds.feedburner.com/SlatePoliticsProse' },
        { rssLink: 'http://feeds.feedburner.com/SlateAudioBookClub' },
        { rssLink: 'http://feeds.feedburner.com/SlateSpoilerSpecials' },
      ]
    }], seeder.disconnect);
  });
});

