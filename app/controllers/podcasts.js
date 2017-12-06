const mongoose = require('mongoose');
const Podcast = mongoose.model('Podcast');

function index(req, res) {

  Podcast.find({ title: /stuff/i }, (err, records) => {
    if (err) return console.error(err);
    res.json(records);
  });

}

module.exports = {
  index
};
