'use strict';

window.initializeFilters = (function () {
  return function (element, callback) {
    element.addEventListener('click', function (evt) {
      var filter = evt.target;
      if (filter.tagName === 'INPUT') {
        callback(filter.value);
      }
    });
    element.addEventListener('keydown', function (evt) {
      if (window.utils.isActivationEvent) {
        var filter = evt.target;
        filter.click();
      }
    });
  };
})();
