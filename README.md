# Ponypod [![Build Status](https://travis-ci.org/jetpackpony/ponypod.svg?branch=master)](https://travis-ci.org/jetpackpony/ponypod)

Ponypod is a web app for tracking and listening to podcasts. This repo is for backend api. For web single-page application to to [PonyPod Web](https://github.com/jetpackpony/ponypod-web "PonyPod Web").

## Installation
```bash
git clone git@github.com:jetpackpony/ponypod.git
cd ponypod
bundle install
```
## Running
Start up the rails dev server
```bash
$ rails s
```
Visit your app at [http://localhost:3000](http://localhost:3000).

### Running Tests
```bash
$ bundle exec rspec
```

## Rake tasks
### Update episodes
Goes over every podcast in the database, downloads it's feed and parses it. Will create any new episodes in the database and update existing episodes' data.
```bash
$ rake update_episodes
```

## API reference

