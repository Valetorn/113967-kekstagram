'use strict';

window.utils = (function () {
  var ENTER_KEY_CODE = 13;
  var ESCAPE_KEY_CODE = 27;
  var isKeyboardEvent = function (evt) {
    return typeof evt.keyCode !== 'undefined';
  };
  return {
    isActivationEvent: function (evt) {
      return isKeyboardEvent(evt) && evt.keyCode === ENTER_KEY_CODE;
    },
    isDeactivationEvent: function (evt) {
      return isKeyboardEvent(evt) && evt.keyCode === ESCAPE_KEY_CODE;
    },
    getRandomArray: function (array, quantity) {
      var tempArray = array.slice();
      var result = [];
      for (var i = 0; i < quantity; i++) {
        var index = Math.floor(Math.random() * tempArray.length);
        result.push(tempArray[index]);
        tempArray.splice(index, 1);
      }
      return result;
    },
    cleanContainer: function (container) {
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
    }
  };
})();
