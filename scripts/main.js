var mainWindow = nw.Window.get();
var mainWindowVisible = true;
var trayCreated = false;

// get startup preference setting from local storage
var startup_minimized = (localStorage.startup_minimized === 'true');

mainWindow.on('close', function () {
  this.hide();
});

mainWindow.on('loaded', function () {
  createTray();
  trayCreated = true;
});

mainWindow.on('new-win-policy', function (frame, url, policy) {
  if (!url.startsWith('https://accounts.google.com')) {
    policy.ignore();
    nw.Shell.openExternal(url);
  }
});
