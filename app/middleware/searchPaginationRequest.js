'use strict';
const R = require('ramda');
const {
  parsePageParams,
  buildSearchObject,
  renderRecords,
  renderRecord
} = require('../utils');

const queryModel =
  R.curry((
    {
      Model,
      itemsPerPage,
      paramsToSearch,
      minSearchLength,
      fieldsToPopulate,
      sortBy
    },
    page,
    searchTerm,
    queryParams
  ) => {
    const {
      pageNum,
      pageSize
    } = parsePageParams(page, itemsPerPage);

    return Promise.all([
      Model
      .find(
        R.merge(
          buildSearchObject(
            searchTerm,
            paramsToSearch,
            minSearchLength
          ),
          queryParams || {}
        )
      )
      .skip(pageNum * pageSize)
      .limit(pageSize || itemsPerPage)
      .sort(sortBy)
      .populate(...fieldsToPopulate)
      .exec(),
      Model
      .count(
        R.merge(
          buildSearchObject(
            searchTerm,
            paramsToSearch,
            minSearchLength
          ),
          queryParams || {}
        )
      )
      .exec()
    ])
      .then(([records, count]) => {
        return {
          records,
          itemsCount: count,
          totalPages: Math.ceil(count / pageSize)
        };
      })
  });

const searchPaginationRequest =
  R.curry((queryModel, req, res, next) => {
    queryModel(req.query.page, req.query.search, req.queryParams)
      .then((modelRecords) => {
        req.modelRecords = modelRecords;
        next();
      })
      .catch((err) => {
        next(err);
      })
  });

const sendJSON =
  R.curry((presenter, req, res, next) => (
    (req.modelRecords.totalPages !== null)
    ? res.json(renderRecords(presenter, req.modelRecords.records, req.modelRecords.totalPages))
    : ((req.modelRecords.records[0])
      ? res.json(renderRecord(presenter, req.modelRecords.records[0]))
      : next({ message: 'not found' })
    )
  ));

module.exports = {
  queryModel,
  searchPaginationRequest,
  sendJSON
};
