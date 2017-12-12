const fs = require('fs');
const path = require('path');
const appRoot = require('app-root-path');
const getModelsFiles = () => (
  (modelsDir) => (
    fs.readdirSync(modelsDir)
      .filter((file) => ~file.indexOf('.js'))
      .map((file) => path.join(modelsDir, file))
  )
)(path.join(appRoot.toString(), '/models'));

module.exports = {
  getModelsFiles
};
