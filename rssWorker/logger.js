const R = require('ramda');

const composeLogObject =
  (podcast, type, obj) => {
    return {
      [(podcast) ? podcast._id.toString() : 'general']: {
        [type]: [obj]
      }
  }};

const log =
  (logs) => (
    R.compose(
      R.mergeDeepWith(R.concat, logs),
      composeLogObject
    )
  );

const createLogger =
  () => {
    let logs = {};
    return {
      getLogs: () => logs,
      log: (...args) => (logs = log(logs)(...args))
    };
  };

module.exports = { createLogger };
