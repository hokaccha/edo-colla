var webshot = require('webshot');
var crypto = require('crypto');
var fs = require('fs');

module.exports = function(params, fn) {
  var target = params.target;
  var text = params.text;
  var option = { shotSize:  params.size, defaultWhiteBackground: true };

  if (!text) {
    return res.end('error!');
  }

  var encodedText = encodeURIComponent(text);
  var sha1 = crypto.createHash('sha1').update(encodedText).digest('hex');
  var filePath = __dirname + '/images/' + target + '/' + sha1 + '.jpg';

  if (fs.existsSync(filePath)) {
    return fn(null, filePath);
  }

  var url = 'file://' + __dirname + '/' + target + '/' + target + '.html?' + encodedText;

  webshot(url, filePath, option, function(err) {
    if (err) {
      console.log(url);
      fn(err);
    }
    else {
      fn(null, filePath);
    }
  });
};
