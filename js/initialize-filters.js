'use strict';

window.initializeFilters = (function () {
  return function (element) {
    element.addEventListener('click', function (evt) {
      var filter = evt.target;
      if (filter.tagName === 'INPUT') {
        window.applyFilter(filter.value);
      }
    });
    element.addEventListener('keydown', function (evt) {
      if (window.utils.isActivationEvent(evt)) {
        var filter = evt.target;
        filter.click();
      }
    });
  };
})();
