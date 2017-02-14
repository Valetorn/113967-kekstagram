'use strict';

var uploadOverlay = document.querySelector('.upload-overlay');
var uploadSelectImage = document.getElementById('upload-select-image');
var uploadFile = document.getElementById('upload-file');
var uploadFormCancel = uploadOverlay.querySelector('.upload-form-cancel');
window.filterImagePreview = document.querySelector('.filter-image-preview');
window.controls = document.querySelectorAll('.upload-filter-controls input[type = "radio"]');
window.uploadFilterControls = document.querySelector('.upload-filter-controls');
window.uploadResizeControlsButtonDec = uploadOverlay.querySelector('.upload-resize-controls-button-dec');
window.uploadResizeControlsButtonInc = uploadOverlay.querySelector('.upload-resize-controls-button-inc');
window.uploadResizeControlsValue = uploadOverlay.querySelector('.upload-resize-controls-value');
var uploadResizeControls = uploadOverlay.querySelector('.upload-resize-controls');

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
uploadResizeControls.addEventListener('click', window.createScale);
uploadResizeControls.addEventListener('keydown', function (evt) {
  if (activateElem(evt)) {
    evt.preventDefault();
    window.createScale(evt);
  }
});
window.uploadFilterControls.addEventListener('click', window.initializeFilters);
window.uploadFilterControls.addEventListener('keydown', function (evt) {
  if (activateElem(evt)) {
    window.initializeFilters(evt);
  }
});

