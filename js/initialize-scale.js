'use strict';


window.createScale = (function () {
  return function (resizeControls, step, defaultValue) {
    var uploadResizeControlsButtonDec = resizeControls.querySelector('.upload-resize-controls-button-dec');
    var uploadResizeControlsButtonInc = resizeControls.querySelector('.upload-resize-controls-button-inc');
    var uploadResizeControlsValue = resizeControls.querySelector('.upload-resize-controls-value');
    var resizeStep = step;

    uploadResizeControlsValue.value = defaultValue;
    var scaleNumber = parseInt(uploadResizeControlsValue.value, 10) / 100;
    window.filterImagePreview.style.transform = 'scale(' + scaleNumber + ')';

    var maxOrMinValue = function () {
      if (parseInt(uploadResizeControlsValue.value, 10) < 25) {
        uploadResizeControlsValue.value = 25 + '%';
      }
      if (parseInt(uploadResizeControlsValue.value, 10) > 100) {
        uploadResizeControlsValue.value = 100 + '%';
      }
      return uploadResizeControlsValue.value;
    };
    var setScale = function (evt) {
      var resizeBtn = evt.target;

      if (resizeBtn === uploadResizeControlsButtonDec) {
        uploadResizeControlsValue.value = parseInt(uploadResizeControlsValue.value, 10) - resizeStep + '%';
      } else if (resizeBtn === uploadResizeControlsButtonInc) {
        uploadResizeControlsValue.value = parseInt(uploadResizeControlsValue.value, 10) + resizeStep + '%';
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
