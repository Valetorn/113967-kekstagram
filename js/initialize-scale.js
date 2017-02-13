'use strict';

var maxOrMinValue = (function () {
  return function () {
    if (parseInt(window.uploadResizeControlsValue.value, 10) < 25) {
      window.uploadResizeControlsValue.value = 25 + '%';
    }
    if (parseInt(window.uploadResizeControlsValue.value, 10) > 100) {
      window.uploadResizeControlsValue.value = 100 + '%';
    }
    return window.uploadResizeControlsValue.value;
  };
})();
window.createScale = (function () {
  return function (evt) {
    var resizeStep = 25;
    var resizeControl = evt.target;
    if (resizeControl.className === window.uploadResizeControlsButtonDec.className) {
      window.uploadResizeControlsValue.value = window.parseInt(window.uploadResizeControlsValue.value, 10) - resizeStep + '%';
    } else if (resizeControl.className === window.uploadResizeControlsButtonInc.className) {
      window.uploadResizeControlsValue.value = window.parseInt(window.uploadResizeControlsValue.value, 10) + resizeStep + '%';
    }
    var scaleNumber = parseInt(maxOrMinValue(), 10) / 100;
    window.filterImagePreview.style.transform = 'scale(' + scaleNumber + ')';
  };
})();