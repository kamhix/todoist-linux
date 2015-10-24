var gui = require('nw.gui');
var mainWindow = gui.Window.get();
var mainWindowVisible = true;

mainWindow.on('close', function() {
  this.hide();
  this.close(true);
});
