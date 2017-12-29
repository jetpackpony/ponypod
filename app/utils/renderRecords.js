const R = require('ramda');
const dasherize = require('dasherize');
const moment = require('moment');

// BEGIN value updaters
const convertIds =
  ([ key, value ]) => (
    (key === '_id')
      ? [ 'id', value.toString() ]
      : [ key, value ]
  );

const momentsToStrings =
  ([ key, value ]) => ([
    key,
    (moment.isMoment(value))
      ? value.format()
      : value
  ]);

const datesToMoments =
  ([ key, value ]) => ([
    key,
    (moment.isDate(value))
      ? moment(value)
      : value
  ]);

const traverseObjects =
  ([ key, value ]) => ([
    key,
    (R.is(Object, value))
      ? updateRecordFields(value)
      : value
  ]);

const updateValue =
  R.compose(
    traverseObjects,
    momentsToStrings,
    datesToMoments,
    convertIds
  );
// END value updaters

const updateRecordFields =
  (rec) => R.keys(rec).reduce(
    (newObj, key) => (
      R.assoc(...updateValue([ key, rec[key] ]), newObj)
    ),
    {}
  );

const toJSON = R.invoker(0, 'toJSON');

const recordToJSON =
  R.compose(
    dasherize,
    updateRecordFields,
    toJSON
  );

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


module.exports = {
  renderRecords,
  renderRecord,
  recordToJSON,
  updateValue,
  updateRecordFields,
  toJSON
};
