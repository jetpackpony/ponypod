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

module.exports = {
  parsePageParams,
  parseIntDecimal,
  buildSearchObject
};

const parseProperty =
  (defValue) => R.compose(
    replaceNanWithDefault(defValue),
    parseIntDecimal,
    R.prop
  );

const replaceNanWithDefault = R.curry(
  (def, value) => ((!value) ? def : value)
);

const buildParamsWithTerm = (term, params) => ({
  "$or": params.map((p) => ({ [p]: term }))
});

const makeTerm =
  (term) => new RegExp(term.toLowerCase(), "i");
