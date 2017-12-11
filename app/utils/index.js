const R = require('ramda');

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
  (record) => (R.compose(
    R.dissoc('_id'),
    R.assoc('id', record.toJSON()._id.toString())
  )(record.toJSON()));

const renderRecords =
  (presenter, records, totalPages) => (
    presenter.render(
      records.map(recordToJSON),
      { meta: { totalPages } }
    )
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
