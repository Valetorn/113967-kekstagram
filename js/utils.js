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
    getRandomElement: function (array) {
      return array[Math.floor(Math.random() * array.length)];
    },
    getRandomElementExcept: function (array, currentArrayElement) {
      var newElement;
      do {
        newElement = this.getRandomElement(array);
      } while (newElement === currentArrayElement);
      return newElement;
    },
    getRandomArray: function (array, n) {
      var randomArray = new Array(n);
      var length = array.length;
      var taken = new Array(length);
      if (n > length) {
        throw new RangeError('getRandom: more elements taken than available');
      }
      while (n--) {
        var x = Math.floor(Math.random() * length);
        randomArray[n] = array[x in taken ? taken[x] : x];
        taken[x] = --length;
      }
      return randomArray;
    },
    cleanContainer: function (container) {
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
    }
  };
})();
