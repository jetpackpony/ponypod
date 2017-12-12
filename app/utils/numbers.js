const R = require('ramda');

const parseIntDecimal = R.flip(parseInt)(10);

const getRandomInt =
  (min, max) => (
    (min, max) => (Math.floor(Math.random() * (max - min)) + min)
  )(Math.ceil(min), Math.floor(max));

module.exports = {
  parseIntDecimal,
  getRandomInt
};
