'use strict';
const R = require('ramda');

const queryRecordByID =
  R.curry(
    ({ Model, fieldsToPopulate = [] }, queryParams) => (
      Model
      .find(queryParams)
      .populate(...fieldsToPopulate)
      .exec()
      .then(([record]) => {
        return {
          records: [record],
          itemsCount: 1,
          totalPages: null
        };
      })
    )
  );

const recordByIDRequest =
  R.curry((queryRecordByID, req, res, next) => {
    queryRecordByID(req.queryParams)
      .then((modelRecords) => {
        req.modelRecords = modelRecords;
        next();
      })
      .catch((err) => {
        next(err);
      });
  });

module.exports = {
  queryRecordByID,
  recordByIDRequest
};
