var nw = require('nw.gui');
var fs = require('fs');
var path = require('path');

var saveSettings = function (settings, callback) {
  var file = 'settings.json';
  var filePath = path.join(nw.App.dataPath, file);
  fs.writeFile(filePath, JSON.stringify(settings), function (err) {
    if (err) {
      console.info("There was an error attempting to save your data.");
      console.warn(err.message);
      return;
      callback(err);
    } else if (callback) {
      callback();
    }
  });
};

var readSettings = function (callback) {
  var file = 'settings.json';
  var filePath = path.join(nw.App.dataPath, file);
  return fs.readFile(filePath, 'utf8', function (err, content) {
    if (err) {
      console.info("There is nothing to read.");
      return callback(null);
    }

    return callback(JSON.parse(content));
  });
};
