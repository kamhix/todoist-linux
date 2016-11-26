var mainWindow = nw.Window.get();
var mainWindowVisible = true;
var trayCreated = false;

mainWindow.on('close', function () {
  this.hide();
  this.close(true);
});
