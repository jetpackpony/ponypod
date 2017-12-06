'use strict';

const mongoose = require('mongoose');

const PodcastSchema = new mongoose.Schema({
  title: { type: String, default: '' }
});

mongoose.model('Podcast', PodcastSchema);
