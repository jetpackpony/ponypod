const buildSearchObject =
  (searchTerm, params, minTermLength = 3) => (
    (!searchTerm || searchTerm.length < minTermLength)
    ? null
    : buildParamsWithTerm(makeTerm(searchTerm), params)
  );

const buildParamsWithTerm =
  (term, params) => ({
    "$or": params.map((p) => ({ [p]: term }))
  });

const makeTerm =
  (term) => new RegExp(term.toLowerCase(), "i");

module.exports = {
  buildSearchObject
};
