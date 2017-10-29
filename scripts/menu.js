var addMenu = function (mainWindow) {
  var menu = new nw.Menu({type: 'menubar'});

  var submenu = new nw.Menu();
  submenu.append(new nw.MenuItem({ label: 'Shortcuts', click: showShortcutSettings }));
  submenu.append(new nw.MenuItem({ label: 'Quit', click: function () {mainWindow.close(true);} }));

  menu.append(new nw.MenuItem({
    label: '?',
    submenu: submenu
  }));

  mainWindow.menu = menu;
};
