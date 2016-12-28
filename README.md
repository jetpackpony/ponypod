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
This app exposes a RESTful api to communicate with clients. The api format follows [JSON API](http://jsonapi.org/format/ "JSON API") specification. Here is a list of endpoints:
### Get Podcasts
Returns a list of all the podcasts in no particular order. If `query` parameter is present, returns podcasts filtered by query on name and description.
#### Request format
`GET /podcasts`
#### URL params
* `query=[string]` - if present, podcast list will be filtered by this query
#### Success response
**Code:** 200
**Response:**
```json
[
  {
    "id":1,
    "title":"Hello Internet",
    "rss_link":"http://www.hellointernet.fm/podcast?format=rss",
    "description":"CGP Grey and Brady Haran talk about YouTube, life, work, whatever.",
    "image":"http://static1.squarespace.com/static/52d66949e4b0a8cec3bcdd46/t/52ebf67fe4b0f4af2a4502d8/1391195777839/1500w/Hello+Internet.003.png",
    "created_at":"2016-12-28T12:26:28.683Z",
    "updated_at":"2016-12-28T12:27:41.717Z"
  },
  ...
]
```
