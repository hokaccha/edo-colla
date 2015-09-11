var fs = require('fs');
var express = require('express');
var app = express();
var capture = require('./capture');

app.get('/edo', function(req, res) {
  capture({
    target: 'edo',
    text: req.query.text,
    size: { width: 300, height: 427 }
  }, function(err, filePath) {
    if (err) {
      console.error(err);
      res.end('error!');
    }
    else {
      fs.createReadStream(filePath).pipe(res);
    }
  });
});

app.get('/zudo', function(req, res) {
  capture({
    target: 'zudo',
    text: req.query.text,
    size: { width: 685, height: 395 }
  }, function(err, filePath) {
    if (err) {
      console.error(err);
      res.end('error!');
    }
    else {
      fs.createReadStream(filePath).pipe(res);
    }
  });
});

app.listen(4000);
