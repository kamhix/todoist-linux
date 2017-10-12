var createTray = function () {
  if (trayCreated) {
    return;
  }

  var tray = new nw.Tray({
    title: 'Todoist Linux',
    icon: 'assets/icon.png'
  });

  var quitMenuItem = new nw.MenuItem({
    label: 'Quit',
    click: function () {
      mainWindow.close(true);
    }
  });

  var showHideMenuItem = new nw.MenuItem({
    label: 'Show / Hide',
    click: function () {
      if (mainWindowVisible) {
        hideAppWin();
      } else {
        showAppWin();
      }
    }
  });

  var startupMenuItem = new nw.MenuItem({
    label: 'Start up minimized',
    type: 'checkbox',
    checked: startup_minimized,
    click: function () {
      startup_minimized = !startup_minimized;
      localStorage.startup_minimized = startup_minimized;
    }
  });

  var menu = new nw.Menu();
  menu.append(showHideMenuItem);
  menu.append(startupMenuItem);
  menu.append(quitMenuItem);
  tray.menu = menu;

  var showAppWin = function () {
    mainWindow.show();
    mainWindowVisible = true;
  }

  var hideAppWin = function () {
    mainWindow.hide();
    mainWindowVisible = false;
  }

  mainWindow.on('close', function() {
    hideAppWin();
  });

  tray.on('click', function() {
    if (!mainWindowVisible) {
      showAppWin();
    }
  });

  if (startup_minimized) {
    hideAppWin();
  }

};
