const express = require('express');
const app = express();

app.set('trust proxy', true);

app.get('/', (req, res) => {
  res.json({
    test: 'test'
  });
});

app.listen(8080);
