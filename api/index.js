const express = require('express')
const app = express()

app.get('/api/hello', (req, res) => {
  res.send('Hello World!');
});

module.exports = app;