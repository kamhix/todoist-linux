var createTray = function () {
  if (trayCreated) {
    return;
  }

  var tray = new nw.Tray({
    title: 'Todoist Linux',
    icon: 'assets/icon.png'
  });

  var menuWithShow = new nw.Menu();
  var menuWithHide = new nw.Menu();

  var quitMenuItem = new nw.MenuItem({
    label: 'Quit',
    click: function () {
      tray.remove();
      tray = null;
      mainWindow.close(true);
    }
  });

  var showMenuItem = new nw.MenuItem({
    label: 'Show',
    click: function () {
      tray.menu = menuWithHide;
      mainWindow.show();
      mainWindowVisible = true;
    }
  });

  var hideMenuItem = new nw.MenuItem({
    label: 'Hide',
    click: function () {
      tray.menu = menuWithShow
      mainWindow.hide();
      mainWindowVisible = false;
    }
  });

  menuWithShow.append(showMenuItem);
  menuWithShow.append(quitMenuItem);

  menuWithHide.append(hideMenuItem);
  menuWithHide.append(quitMenuItem);

  tray.menu = menuWithHide;

  mainWindow.on('close', function() {
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
      tray.menu = menuWithShow;
      mainWindow.hide();
      mainWindowVisible = false;
    }
  });
};
