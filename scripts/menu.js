var addMenu = function (mainWindow) {
  var menu = new nw.Menu({type: 'menubar'});

  var submenu = new nw.Menu();
  submenu.append(new nw.MenuItem({ label: 'Shortcuts', click: showShortcutSettings }));
  submenu.append(new nw.MenuItem({ label: 'Quit', click: function () {mainWindow.close(true);} }));
  
  var zoommenu = new nw.Menu();
  
  zoommenu.append(new nw.MenuItem({ 
    label: 'Reset', 
    click: function () {
      mainWindow.zoomLevel = 0;
    } 
  }));
  
  zoommenu.append(new nw.MenuItem({ 
    label: 'Zoom -', 
    click: function () {
      mainWindow.zoomLevel -= 0.2;
    } 
  }));
  
  zoommenu.append(new nw.MenuItem({ 
    label: 'Zoom +', 
    click: function () {
      mainWindow.zoomLevel += 0.2;
    } 
  }));

  menu.append(new nw.MenuItem({
    label: 'Zoom',
    submenu: zoommenu
  }));
  
  menu.append(new nw.MenuItem({
    label: 'Options',
    submenu: submenu
  }));

  mainWindow.menu = menu;
};
