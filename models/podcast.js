'use strict';

const mongoose = require('mongoose');

const PodcastSchema = new mongoose.Schema({
  title: { type: String, default: '' }
});

module.exports = mongoose.model('Podcast', PodcastSchema);
