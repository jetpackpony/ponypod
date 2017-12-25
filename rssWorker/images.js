const R = require('ramda');
const config = require('../config');
const Jimp = require('jimp');
const Storage = require('@google-cloud/storage');

const IMAGE_BUCKET_ID = config.get('IMAGE_BUCKET_ID');
const storage = Storage({
  projectId: config.get('GCLOUD_PROJECT')
});
const bucket = storage.bucket(IMAGE_BUCKET_ID);

const getStorageURL =
  (fileName) => (
    `https://storage.googleapis.com/${IMAGE_BUCKET_ID}/${fileName}`
  );

const loadImage =
  (url) => Jimp.read(url);

const resizeImage =
  (img) => img.resize(850, 850);

const getImageBuffer =
  (img) => (
    new Promise((resolve, reject) => (
      img.getBuffer(
        img.getMIME(),
        (err, buffer) => (
          (err)
          ? reject({ img, err })
          : resolve({ img, buffer })
        )
      )
    ))
  );

const prepareToUpload =
  R.curry((fileName, { img, buffer }) => ({
    buffer,
    mime: img.getMIME(),
    fileName: `${fileName}.${img.getExtension()}`
  }));

const uploadToGoogleCloud =
  ({ mime, fileName, buffer }) => (
    new Promise((resolve, reject) => {
      const stream = bucket.file(fileName).createWriteStream({
        metadata: { contentType: mime }
      });
      stream.on('error', reject);
      stream.on('finish',
        R.partial(resolve, [getStorageURL(fileName)]));
      stream.end(buffer);
    })
  );

const uploadImage =
  (url, fileName) => (
    loadImage(url)
      .then(resizeImage)
      .then(getImageBuffer)
      .then(prepareToUpload(fileName))
      .then(uploadToGoogleCloud)
  );

module.exports = {
  uploadImage
};
