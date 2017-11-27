const express = require('express');

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  res.header('Access-Control-Expose-Headers', 'X-Token');

  next();
});

app.get('/:key*', (req, res) => {
  res.sendFile(`${__dirname}/${req.params.key}.json`);
});

app.listen(4002, () => {
  console.log('listen 4002 as development');
});