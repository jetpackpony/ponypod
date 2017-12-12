const R = require('ramda');
const dasherize = require('dasherize')

const parsePageParams = (pageParams, defaultPerPage) => ({
  pageNum: parseProperty(0)('number', pageParams),
  pageSize: parseProperty(defaultPerPage)('size', pageParams)
});

const parseIntDecimal = R.flip(parseInt)(10);

const buildSearchObject =
  (searchTerm, params, minTermLength = 3) => (
    (!searchTerm || searchTerm.length < minTermLength)
    ? null
    : buildParamsWithTerm(makeTerm(searchTerm), params)
  );

const recordToJSON =
  (record) => processRecord(record.toJSON());

const convertIds =
  (rec) => R.keys(rec).reduce(
    (newObj, key) => (
      (key === '_id')
      ? R.assoc('id', rec['_id'].toString(), newObj)
      : R.assoc(key, rec[key], newObj)
    ), {});

const traverseObjects =
  (rec) => R.keys(rec).reduce(
    (newObj, key) => (
      (R.is(Object, rec[key]))
      ? R.assoc(key, processRecord(rec[key]), newObj)
      : R.assoc(key, rec[key], newObj)
    ), {});


const processRecord =
  R.compose(dasherize, traverseObjects, convertIds);

const renderRecords =
  (presenter, records, totalPages) => (
    presenter.render(
      records.map(recordToJSON),
      { meta: { totalPages } }
    )
  );

const renderRecord =
  (presenter, record) => (
    presenter.render(recordToJSON(record))
  );

const fs = require('fs');
const path = require('path');
const appRoot = require('app-root-path');
const getModelsFiles = () => (
  (modelsDir) => (
    fs.readdirSync(modelsDir)
      .filter((file) => ~file.indexOf('.js'))
      .map((file) => path.join(modelsDir, file))
  )
)(path.join(appRoot.toString(), '/models'));

const getRandomInt =
  (min, max) => (
    (min, max) => (
      Math.floor(Math.random() * (max - min)) + min
    )
  )(Math.ceil(min), Math.floor(max));

module.exports = {
  parsePageParams,
  parseIntDecimal,
  buildSearchObject,
  recordToJSON,
  renderRecords,
  renderRecord,
  getModelsFiles,
  getRandomInt
};

const parseProperty =
  (defValue) => R.compose(
    replaceNanWithDefault(defValue),
    parseIntDecimal,
    R.prop
  );

const replaceNanWithDefault =
  R.curry((def, value) => ((!value) ? def : value));

const buildParamsWithTerm =
  (term, params) => ({
    "$or": params.map((p) => ({ [p]: term }))
  });

const makeTerm =
  (term) => new RegExp(term.toLowerCase(), "i");
