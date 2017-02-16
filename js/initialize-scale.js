'use strict';


window.initializeScale = (function () {
  return function (resizeControlsValue, step, defaultValue) {
    var resizeControls = window.uploadOverlay.querySelector('.upload-resize-controls');
    var uploadResizeControlsButtonDec = resizeControls.querySelector('.upload-resize-controls-button-dec');
    var uploadResizeControlsButtonInc = resizeControls.querySelector('.upload-resize-controls-button-inc');
    var resizeStep = step;
    var minValue = 25;
    var maxValue = 100;

    if (parseInt(defaultValue, 10) >= minValue && parseInt(defaultValue, 10) <= maxValue) {
      resizeControlsValue.value = defaultValue;
    } else if (parseInt(defaultValue, 10) <= 25) {
      resizeControlsValue.value = minValue + '%';
    } else {
      resizeControlsValue.value = maxValue + '%';
    }

    var scaleNumber = parseInt(resizeControlsValue.value, 10) / 100;
    window.filterImagePreview.style.transform = 'scale(' + scaleNumber + ')';

    var maxOrMinValue = function () {
      if (parseInt(resizeControlsValue.value, 10) < minValue) {
        resizeControlsValue.value = minValue + '%';
      }
      if (parseInt(resizeControlsValue.value, 10) > maxValue) {
        resizeControlsValue.value = maxValue + '%';
      }
      return resizeControlsValue.value;
    };
    var setScale = function (evt) {
      var resizeBtn = evt.target;

      if (resizeBtn === uploadResizeControlsButtonDec) {
        resizeControlsValue.value = parseInt(resizeControlsValue.value, 10) - resizeStep + '%';
      } else if (resizeBtn === uploadResizeControlsButtonInc) {
        resizeControlsValue.value = parseInt(resizeControlsValue.value, 10) + resizeStep + '%';
      }
      scaleNumber = parseInt(maxOrMinValue(), 10) / 100;
      window.filterImagePreview.style.transform = 'scale(' + scaleNumber + ')';
    };
    resizeControls.addEventListener('click', function (evt) {
      setScale(evt);
    });
    resizeControls.addEventListener('keydown', function (evt) {
      if (window.activateElem(evt)) {
        evt.preventDefault();
        setScale(evt);
      }
    });
  };
})();
