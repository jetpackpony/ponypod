const R = require('ramda');
const { parseIntDecimal } = require('./numbers');

const parsePageParams = (pageParams, defaultPerPage) => ({
  pageNum: parseProperty(0)('number', pageParams),
  pageSize: parseProperty(defaultPerPage)('size', pageParams)
});

const parseProperty =
  (defValue) => R.compose(
    replaceNanWithDefault(defValue),
    parseIntDecimal,
    R.prop
  );

const replaceNanWithDefault =
  R.curry((def, value) => ((!value) ? def : value));

module.exports = {
  parsePageParams
};
