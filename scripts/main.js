var gui = require('nw.gui');
var view = document.getElementById('view');
var loader = document.querySelector('.loader');

var redirectLink = function (winFrame) {
  
  var links = winFrame.document.querySelectorAll('a');
  
  // window.alert(links.length);

  for (var i = 0; i < links.length; i++) {
    var link = links[i];

    if (link.href === '' || link.href.charAt(link.href.length - 1) === '#') {
      continue;
    }

    var oldOnclick = link.onclick;

    link.onclick = function (e) {
      e.preventDefault();
      gui.Shell.openExternal(this.href);
    };
  }
};

view.addEventListener('load', function () {
  
  var winFrame = this.contentWindow;

  // window.alert(winFrame.location.href);
  
  if (winFrame.location.href === 'https://todoist.com/seeYou') {
    winFrame.location.href = 'https://todoist.com/app';
  } else {
    loader.className = 'loader hide';
  }
  
  winFrame.onbeforeunload = function(e) {
    loader.className = 'loader';
    // return winFrame.location.href + " # " + winFrame.document.referrer + " # " + winFrame.document.activeElement.href;
  };
  
  winFrame.redirectToGoogle = function () {
    
    var state = {
        "success_page": "",
        "csrf": "b8ed60fe23914a3d9564e1d57a65d666",
        "inline": 0,
        "connect": 0
    };
    
    state = encodeURIComponent(JSON.stringify(state));
    
    var origin = winFrame.location.origin;
    
    if(!origin) {
        origin = location.protocol + "//" + winFrame.location.hostname + (winFrame.location.port ? ':' + winFrame.location.port: '');
    }

    var redirect_uri = origin + '/Users/gplusRedirect';

    var href = 'https://accounts.google.com/o/oauth2/auth?scope=' +
               'email%20profile&' +
               'state='+ state +'&' +
               'redirect_uri='+ redirect_uri +'&'+
               'response_type=token&' +
               'apppackagename=com.todoist&' +
               'client_id=600979030768-7o35cjq1gv138e22oj0j39u0bp0mn3hj.apps.googleusercontent.com';

    winFrame.popup(href, 'Google Authentication', 450, 550);
    
    return false;
  }
  
  winFrame.popup = function (url, title, w, h) {
    
      var oldHref = window.location.href;
    
      var win = gui.Window.open(url, {
        position: 'center',
        title: title,
        width: w,
        height: h
      });
    
      win.on('close', function() {
        this.hide();
        window.location.href = oldHref; 
      });

      return win;
  }
  
  redirectLink(winFrame);
});
  

window.onload = function () {

};