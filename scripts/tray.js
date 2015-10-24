var tray = new gui.Tray({
  title: 'Todoist Linux',
  icon: 'assets/icon.png'
});

var menuWithShow = new gui.Menu();
var menuWithHide = new gui.Menu();

var quitMenuItem = new gui.MenuItem({
  label: 'Quit',
  click: function () {
    mainWindow.close();
  }
});

var showMenuItem = new gui.MenuItem({
  label: 'Show',
  click: function () {
    tray.menu = menuWithHide;
    mainWindow.show();
    mainWindowVisible = true;
  }
});

var hideMenuItem = new gui.MenuItem({
  label: 'Hide',
  click: function () {
    mainWindow.minimize();
  }
});

menuWithShow.append(showMenuItem);
menuWithShow.append(quitMenuItem);

menuWithHide.append(hideMenuItem);
menuWithHide.append(quitMenuItem);

tray.menu = menuWithHide;

mainWindow.on('minimize', function() {
  this.hide();
  tray.menu = menuWithShow;
  mainWindowVisible = false;
});

tray.on('click', function() {
  if (!mainWindowVisible) {
    tray.menu = menuWithHide;
    mainWindow.show();
    mainWindowVisible = true;
  } else {
    mainWindow.minimize();
  }
});
