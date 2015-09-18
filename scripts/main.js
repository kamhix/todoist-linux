var gui = require('nw.gui');
var mainWindow = gui.Window.get();

var tray = new gui.Tray({ title: 'Todoist', icon: 'assets/icon.png' });

var menu = new gui.Menu();
var showHideItem = new gui.MenuItem({ type: 'normal', label: 'Show/Hide'});
var exitItem = new gui.MenuItem({ type: 'normal', label: 'Exit' });
menu.append(showHideItem);
menu.append(exitItem);
tray.menu = menu;

var window_minimized = false;
var window_blurred = false;
var window_hidden = false;

var view = document.getElementById('view');
var loader = document.querySelector('.loader');

var checkLink = function (e) {
  var link;

  if (e.target.nodeName === 'A') {
    link = e.target;
  } else if (e.target.parentNode.nodeName === 'A') {
    link = e.target.parentNode;
  }


  if (link && link.href !=='' && !link.href.endsWith('#') &&
      !link.href.startsWith('https://todoist.com/app')) {
    e.preventDefault();
    gui.Shell.openExternal(link.href);
  }
};

var redirectLink = function (winFrame) {

  var links = winFrame.document.querySelectorAll('a');

  winFrame.addEventListener('click', checkLink);
};

view.addEventListener('load', function () {

  var winFrame = this.contentWindow;

  if (winFrame.location.href === 'https://todoist.com/seeYou') {
    winFrame.location.href = 'https://todoist.com/app';
  } else {
    loader.className = 'loader hide';
  }

  winFrame.onbeforeunload = function(e) {
    loader.className = 'loader';
  };

  winFrame.popup = function (url, title, w, h) {

    var oldHref = window.location.href;

    var win = gui.Window.open(url, {
      toolbar: false,
      position: 'center',
      title: title,
      width: w,
      height: h
    });

    win.on('close', function() {
      this.hide();
      this.close();
      window.location.href = oldHref;
    });

    return win;
  }

  redirectLink(winFrame);
});

changeWindowState = function() {
  if(window_minimized) {
    mainWindow.restore();
    window_minimized = false;
    window_blurred = false; // when minimizing a window, also blur is called --> needs reversing
  }
  else if(window_hidden) {
    mainWindow.show();
    window_hidden = false;
    window_blurred = false; // when hiding a window, also blur is called --> needs reversing
  }
  //needs to be at the end (because minimizing or hiding first calls blur --> blur attribute is true)
  else if(window_blurred) {
    mainWindow.focus();
    window_blurred = false;
  }
  else {
    mainWindow.hide();
    window_hidden = true;
  }
};

tray.on('click', function() {
  changeWindowState();
});

mainWindow.on('minimize', function() {
  window_minimized = true;
});

mainWindow.on('blur', function() {
  window_blurred = true;
});

mainWindow.on('close', function() {
  this.hide();
  window_hidden = true;
});

showHideItem.click = function() {
    changeWindowState();
};

exitItem.click = function() {
  if(!window_hidden) {
    mainWindow.hide();
  }
  mainWindow.close(true);
};
