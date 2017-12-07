const R = require('ramda');

const parsePageParams = (pageParams, defaultPerPage) => ({
  pageNum: parseProperty(0)('number', pageParams),
  pageSize: parseProperty(defaultPerPage)('size', pageParams)
});

const parseIntDecimal = R.flip(parseInt)(10);

module.exports = {
  parsePageParams, parseIntDecimal
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
