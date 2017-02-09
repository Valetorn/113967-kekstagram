'use strict';
var uploadOverlay = document.querySelector('.upload-overlay');
var uploadSelectImage = document.getElementById('upload-select-image');
var uploadFile = document.getElementById('upload-file');
var uploadFormCancel = uploadOverlay.querySelector('.upload-form-cancel');
var filterImagePreview = document.querySelector('.filter-image-preview');
var controls = document.querySelectorAll('.upload-filter-controls input[type = "radio"]');
var uploadFilterControls = document.querySelector('.upload-filter-controls');
var uploadResizeControlsButtonDec = uploadOverlay.querySelector('.upload-resize-controls-button-dec');
var uploadResizeControlsButtonInc = uploadOverlay.querySelector('.upload-resize-controls-button-inc');
var uploadResizeControlsValue = uploadOverlay.querySelector('.upload-resize-controls-value');

var ENTER_KEY_CODE = 13;
var ESCAPE_KEY_CODE = 27;

function activateElem(evt) {
  return evt.keyCode && evt.keyCode === ENTER_KEY_CODE;
}
function changeAriaAttribute(isOpen) {
  uploadOverlay.setAttribute('aria-pressed', !isOpen);
}
function uploadOverlayKeydownHandler(evt) {
  if (evt.keyCode === ESCAPE_KEY_CODE) {
    closeUploadOverlay();
    changeAriaAttribute(false);
  }
}
function openUploadOverlay() {
  uploadSelectImage.classList.add('invisible');
  uploadOverlay.classList.remove('invisible');
  document.addEventListener('keydown', uploadOverlayKeydownHandler);
  changeAriaAttribute(true);
}
function closeUploadOverlay() {
  uploadOverlay.classList.add('invisible');
  uploadSelectImage.classList.remove('invisible');
  document.removeEventListener('keydown', uploadOverlayKeydownHandler);
  changeAriaAttribute(false);
}

uploadFile.addEventListener('change', function () {
  openUploadOverlay();
});
uploadFormCancel.addEventListener('click', function () {
  closeUploadOverlay();
});
uploadFormCancel.addEventListener('keydown', function (evt) {
  if (activateElem(evt)) {
    closeUploadOverlay();
  }
});
uploadResizeControlsButtonDec.addEventListener('click', function () {
  uploadResizeControlsValue.value = parseInt(uploadResizeControlsValue.value, 10) - 25 + '%';
  if (parseInt(uploadResizeControlsValue.value, 10) < 25) {
    uploadResizeControlsValue.value = 25 + '%';
  }
  var numberForStyle = parseInt(uploadResizeControlsValue.value, 10) / 100;
  filterImagePreview.style.transform = 'scale(' + numberForStyle + ')';
});
uploadResizeControlsButtonInc.addEventListener('click', function () {
  uploadResizeControlsValue.value = parseInt(uploadResizeControlsValue.value, 10) + 25 + '%';
  if (parseInt(uploadResizeControlsValue.value, 10) > 100) {
    uploadResizeControlsValue.value = 100 + '%';
  }
  var numberForStyle = parseInt(uploadResizeControlsValue.value, 10) / 100;
  filterImagePreview.style.transform = 'scale(' + numberForStyle + ')';
});

function setFilter(evt) {
  for (var i = 0; i < controls.length; i++) {
    filterImagePreview.classList.remove('filter-' + controls[i].value);
  }
  var filter = evt.target;
  if (filter.tagName === 'INPUT') {
    filterImagePreview.classList.add('filter-' + filter.value);
  }
  if (filter.tagName === 'LABEL') {
    var inputFilter = document.getElementById(filter.htmlFor);
    inputFilter.checked = true;
    filterImagePreview.classList.add('filter-' + inputFilter.value);
  }
}
uploadFilterControls.addEventListener('click', function (evt) {
  setFilter(evt);
});
uploadFilterControls.addEventListener('keydown', function (evt) {
  if (activateElem(evt)) {
    setFilter(evt);
  }
});


