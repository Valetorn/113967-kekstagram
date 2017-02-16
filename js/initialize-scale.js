'use strict';


window.initializeScale = (function () {
  return function (element, step, defaultValue) {
    var resizeControlsValue = element.querySelector('.upload-resize-controls-value');
    var resizeStep = step;
    var minValue = 25;
    var maxValue = 100;

    if (parseInt(defaultValue, 10) >= minValue && parseInt(defaultValue, 10) <= maxValue) {
      resizeControlsValue.value = defaultValue;
    } else if (parseInt(defaultValue, 10) <= minValue) {
      resizeControlsValue.value = minValue + '%';
    } else {
      resizeControlsValue.value = maxValue + '%';
    }

    var scaleNumber = parseInt(resizeControlsValue.value, 10) / 100;
    window.filterImagePreview.style.transform = 'scale(' + scaleNumber + ')';

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
      window.filterImagePreview.style.transform = 'scale(' + scaleNumber + ')';
    };
    element.addEventListener('click', function (evt) {
      setScale(evt);
    });
    element.addEventListener('keydown', function (evt) {
      if (window.activateElem(evt)) {
        evt.preventDefault();
        setScale(evt);
      }
    });
  };
})();
