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

  var startup_minimized = (localStorage.startup_minimized === 'true');

  var startupMenuItem = new nw.MenuItem({
    label: 'Hide on startup',
    type: 'checkbox',
    checked: startup_minimized,
    click: function () {
      startup_minimized = !startup_minimized;
      localStorage.startup_minimized = startup_minimized;
    }
  });

  menuWithShow.append(showMenuItem);
  menuWithShow.append(startupMenuItem);
  menuWithShow.append(quitMenuItem);

  menuWithHide.append(hideMenuItem);
  menuWithHide.append(startupMenuItem);
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
    }
  });

  // hide app window on startup if settings allow
  if (startup_minimized) {
    tray.menu = menuWithShow
    mainWindow.hide();
    mainWindowVisible = false;
  }

};
