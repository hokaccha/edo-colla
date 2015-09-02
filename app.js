var express = require('express');
var webshot = require('webshot');
var fs = require('fs');
var app = express();

var opt = { shotSize: { width: 300, height: 427 } };

app.get('/edo', function(req, res) {
  var text = req.query.text;

  if (!text) {
    return res.end('error!');
  }

  var encodedText = encodeURIComponent(text);
  var filePath = __dirname + '/images/' + encodedText + '.jpg';

  if (fs.existsSync(filePath)) {
    return fs.createReadStream(filePath).pipe(res);
  }

  webshot('file://' + __dirname + '/edo/edo.html?' + encodedText, filePath, opt, function(err) {
    if (err) {
      console.log(err);
      res.end('error!');
    }
    else {
      fs.createReadStream(filePath).pipe(res);
    }
  });
});

app.listen(4000);
