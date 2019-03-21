var express = require('express');
var app = express();

app.get('/api/timestamp/:date_string', (req, res) => {
  var date = req.body.date_string;
  res.json({
    unix : date,
    utc: date
  })

})

app.get('/lol', (req, res) => {

  res.send('Hello Express');

})

module.exports = app;