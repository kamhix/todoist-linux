var view = document.getElementById('view');
var loader = document.querySelector('.loader');
var originalHref = 'https://todoist.com/app';

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
    nw.Window.open(url, {
      position: 'center',
      title: title,
      width: w,
      height: h
    }, function (win) {
      win.on('close', function() {
        this.hide();
        this.close(true);
        winFrame.location.href = originalHref;
      });

      return win;
    });
  };
});
