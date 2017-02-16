'use strict';


window.initializeScale = (function () {
  return function (resizeControlsValue, step, defaultValue) {
    var resizeControls = window.uploadOverlay.querySelector('.upload-resize-controls');
    var uploadResizeControlsButtonDec = resizeControls.querySelector('.upload-resize-controls-button-dec');
    var uploadResizeControlsButtonInc = resizeControls.querySelector('.upload-resize-controls-button-inc');
    var resizeStep = step;

    resizeControlsValue.value = defaultValue;
    var scaleNumber = parseInt(resizeControlsValue.value, 10) / 100;
    window.filterImagePreview.style.transform = 'scale(' + scaleNumber + ')';

    var maxOrMinValue = function () {
      if (parseInt(resizeControlsValue.value, 10) < 25) {
        resizeControlsValue.value = 25 + '%';
      }
      if (parseInt(resizeControlsValue.value, 10) > 100) {
        resizeControlsValue.value = 100 + '%';
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
