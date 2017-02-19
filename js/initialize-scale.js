'use strict';


window.initializeScale = (function () {
  return function (element, resizeStep, defaultValue, callback) {
    var resizeControlsValue = element.querySelector('.upload-resize-controls-value');
    var minValue = 25;
    var maxValue = 100;

    if (defaultValue >= minValue && defaultValue <= maxValue) {
      resizeControlsValue.value = defaultValue + '%';
    } else if (defaultValue <= minValue) {
      resizeControlsValue.value = minValue + '%';
    } else {
      resizeControlsValue.value = maxValue + '%';
    }

    var scaleNumber = parseInt(resizeControlsValue.value, 10) / 100;
    callback(scaleNumber);

    var setScale = function (evt) {
      var resizeBtn = evt.target;
      var currentScale = parseInt(resizeControlsValue.value, 10);

      if (String(resizeBtn.className).match('upload-resize-controls-button-dec')) {
        var scale = currentScale - resizeStep;
        if (scale < minValue) {
          scale = minValue;
        }
        resizeControlsValue.value = scale + '%';
      } else {
        scale = currentScale + resizeStep;
        if (scale > maxValue) {
          scale = maxValue;
        }
        resizeControlsValue.value = scale + '%';
      }
      scaleNumber = parseInt(resizeControlsValue.value, 10) / 100;
      callback(scaleNumber);
    };
    element.addEventListener('click', function (evt) {
      setScale(evt);
    });
    element.addEventListener('keydown', function (evt) {
      if (window.utils.isActivationEvent(evt)) {
        evt.preventDefault();
        setScale(evt);
      }
    });
  };
})();
