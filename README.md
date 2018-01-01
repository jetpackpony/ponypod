# Ponypod [![Build Status](https://travis-ci.org/jetpackpony/ponypod.svg?branch=master)](https://travis-ci.org/jetpackpony/ponypod)

Ponypod is a web app for tracking and listening to podcasts.

## Running the server

To config the app copy `config/config.json.sample` to `config/{development,test,production}.json.sample` files and setup all the variables in those files.

To start the server use

```
node app
```

## Running workers

To populate the database with podcasts and episodes you need to run 3 scripts. First seed the database with links to rss feeds of podcasts:

```
node seed
```

Then run rssWorker to download and parse the feeds and update data in the database:

```
node rssWorker
```

Next, run imageWorker to resize podcasts' images and upload them to Google Cloud Storage:

```
node imageWorker
```

imageWorker saves images by the podcasts id, so be careful when running this combination multiple times, it can result in a lot of image duplicates in storage.
By default the development DB is populated. If you need to populate the DB from another environment, prefix the scripts with that environment:

```
NODE_ENV=production node seed
```

## Running tests

To run tests:

```
npm test
```

## Deploying

To deploy you need to setup gcloud tools and setup the default project. Then run:

```
npm run deploy
```
