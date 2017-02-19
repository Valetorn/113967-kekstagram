'use strict';

window.utils = (function () {
  var ENTER_KEY_CODE = 13;
  var ESCAPE_KEY_CODE = 27;
  var isKeyboardEvent = function (evt) {
    return typeof evt.keyCode !== 'undefined';
  };
  var oldFilter = null;
  return {
    isActivationEvent: function (evt) {
      return isKeyboardEvent(evt) && evt.keyCode === ENTER_KEY_CODE;
    },
    isDeactivationEvent: function (evt) {
      return isKeyboardEvent(evt) && evt.keyCode === ESCAPE_KEY_CODE;
    },
    adjustScale: function (scale) {
      window.filterImagePreview.style.transform = 'scale(' + scale + ')';
    },
    applyFilter: function (newFilter) {
      if (oldFilter) {
        window.filterImagePreview.classList.remove('filter-' + oldFilter);
      }
      window.filterImagePreview.classList.add('filter-' + newFilter);
      oldFilter = newFilter;
    }
  };
})();
