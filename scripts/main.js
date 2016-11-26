var mainWindow = nw.Window.get();
var mainWindowVisible = true;
var trayCreated = false;

mainWindow.on('close', function () {
  this.hide();
  this.close(true);
});

mainWindow.on('loaded', function () {
  createTray();
  trayCreated = true;
});

mainWindow.on('new-win-policy', function (frame, url, policy) {
  policy.ignore();
  nw.Shell.openExternal(url);
});
