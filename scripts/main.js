var mainWindow = nw.Window.get();
var mainWindowVisible = true;
var trayCreated = false;

addMenu(mainWindow);
createTray();

mainWindow.on('close', function () {
  this.hide();
});

mainWindow.on('loaded', function () {
  initShortcutSetting();
  trayCreated = true;
});