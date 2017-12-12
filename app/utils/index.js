const { getRandomInt } = require('./numbers');
const { renderRecords, renderRecord } = require('./renderRecords');
const { getModelsFiles } = require('./files');
const { parsePageParams } = require('./pageParams');
const { buildSearchObject } = require('./searchParam');

module.exports = {
  getRandomInt,
  renderRecords,
  renderRecord,
  getModelsFiles,
  parsePageParams,
  buildSearchObject
};
