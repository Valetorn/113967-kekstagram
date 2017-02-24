'use strict';

window.load = (function () {
  return function (url, onLoad) {
    var xhr = new XMLHttpRequest();
    xhr.addEventListener('load', function (evt) {
      onLoad(evt.target.response);
    });
    xhr.responseType = 'json';
    xhr.open('GET', url);
    xhr.send();
  };
})();
