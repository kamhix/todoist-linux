var view = document.getElementById('view');
var loader = document.querySelector('.loader');

view.addEventListener('load', function () {
  var winFrame = this.contentWindow;

  if (winFrame.location.href === 'https://todoist.com/seeYou') {
    winFrame.location.href = 'https://todoist.com/Users/showLogin';
  } else {
    loader.className = 'loader hide';
  }

  winFrame.onbeforeunload = function(e) {
    loader.className = 'loader';
  };
});
