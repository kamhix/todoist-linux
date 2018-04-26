
var removeShortcut = function (key, action, callback) {
  readSettings(function (settings) {
    settings = settings || {};
    settings.shortcuts = settings.shortcuts || [];
    for (var i = 0; i < settings.shortcuts.length; i++) {
      if (key === settings.shortcuts[i][0] && action === settings.shortcuts[i][1]) {
        settings.shortcuts.splice(i, 1);
        break;
      }
    }

    saveSettings(settings, function (err) {
      if (err) {
        return;
      }
      callback();
    });
  });
};

var listShortcut = function (key, action) {
  var shortcutList = document.getElementById('shortcutList');
  var index = shortcutList.rows.length;
  var row = shortcutList.insertRow(index);
  var cell1 = row.insertCell(0);
      cell1.innerText = key;
  var cell2 = row.insertCell(1);
      cell2.innerText = action;
  var cell3 = row.insertCell(2);
  var iconDelete = document.createElement('img');
      iconDelete.src = 'assets/remove.png';
      iconDelete.className = 'img-fluid icon-delete-row';
      iconDelete.addEventListener('click', function () {
        removeShortcut(key, action, function () {
          shortcutList.deleteRow(index);
        });
      });
      cell3.appendChild(iconDelete);
};

var showShortcutList = function () {
  var shortcutList = document.getElementById('shortcutList');

  while (shortcutList.rows.length > 0) {
    shortcutList.deleteRow(0);
  }

  readSettings(function (settings) {
    var spanDiv = document.createElement('span');
    if (settings && settings.shortcuts) {
      for (var i = 0; i < settings.shortcuts.length; i++) {
        listShortcut(settings.shortcuts[i][0], settings.shortcuts[i][1]);
      }
    }
  });
};

var saveShortcut = function (key, action) {
  readSettings(function (settings) {
    settings = settings || {};
    settings.shortcuts = settings.shortcuts || [];
    settings.shortcuts.push([key, action]);
    saveSettings(settings, function (err) {
      if (err) {
        return;
      }
      registerShortcut(key, action);
      showShortcutList();
    });
  });
};

var doAction = function (action) {
  switch (action) {
    case 'show-todoist':
      if (mainWindowVisible) {
        mainWindow.close();
      } else {
        mainWindow.show();
        mainWindowVisible = true;
      }
    break;

    case 'add-task':
      if (!mainWindowVisible) {
        mainWindow.show();
        mainWindowVisible = true;
      }
      mainWindow.window.document.getElementById('view')
        .contentWindow.document.getElementById('quick_add_task_holder').click();
    break;
    
    case 'search':
      if (!mainWindowVisible) {
        mainWindow.show();
        mainWindowVisible = true;
      }
      mainWindow.window.document.getElementById('view')
        .contentWindow.document.querySelector('input.quick_find').focus();
    break;
  }
};

var registerShortcut = function (key, action) {
  nw.App.registerGlobalHotKey(new nw.Shortcut({
    key : key.replace('meta', 'command'),
    active: function() {
      if (typeof action == 'string') {
        doAction(action);
      } else {
        action();
      }
    },
    failed: function(msg) {
      console.log(msg);
    }
  }));
};

var registerShortcuts = function () {
  readSettings(function (settings) {
    if (settings && settings.shortcuts) {
      for (var i = 0; i < settings.shortcuts.length; i++) {
        registerShortcut(settings.shortcuts[i][0], settings.shortcuts[i][1]);
      }
    }
  });
};

var registerZoomShortcut = function (mainWindow) {
  registerShortcut('Ctrl+Numpad0', function () {
    mainWindow.zoomLevel = 0;
  });
  registerShortcut('Ctrl+Digit0', function () {
    mainWindow.zoomLevel = 0;
  });
  registerShortcut('Ctrl+NumpadSubtract', function () {
    mainWindow.zoomLevel -= 0.2;
  });
  registerShortcut('Ctrl+Minus', function () {
    mainWindow.zoomLevel -= 0.2;
  });
  registerShortcut('Ctrl+NumpadAdd', function () {
    mainWindow.zoomLevel += 0.2;
  });
  registerShortcut('Ctrl+Shift+Equal', function () {
    mainWindow.zoomLevel += 0.2;
  });
}

var initShortcutSetting = function () {
  var recordBtn = document.getElementById('recordBtn');
  var shortcutKey = document.getElementById('shortcutKey');
  var shortcutAction = document.getElementById('shortcutAction');
  var formShorcutAdd = document.getElementById('formShorcutAdd');
  var shortcutPanel = document.getElementById('shortcut-panel');
  var shortcutPanelCloseBtn = document.getElementById('shortcut-panel-close-btn');

  recordBtn.addEventListener('click', function () {
    recordBtn.innerText = 'Stop recording !';
    Mousetrap.record(function(sequence) {
      shortcutKey.value = sequence.join(' ');
      recordBtn.innerText = 'Start recording !';
    });
  });

  formShorcutAdd.addEventListener('submit', function (e) {
    e.preventDefault();
    saveShortcut(shortcutKey.value, shortcutAction.value);
  });

  shortcutPanelCloseBtn.addEventListener('click', function () {
    shortcutPanel.style.display = 'none';
  });

  registerShortcuts();
};

var showShortcutSettings = function (mainWindow) {
  document.getElementById('shortcut-panel').style.display = 'block';
  showShortcutList();
};
