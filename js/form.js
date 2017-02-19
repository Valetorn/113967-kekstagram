'use strict';

var uploadOverlay = document.querySelector('.upload-overlay');
var uploadSelectImage = document.getElementById('upload-select-image');
var uploadFile = document.getElementById('upload-file');
var uploadFormCancel = uploadOverlay.querySelector('.upload-form-cancel');
window.filterImagePreview = document.querySelector('.filter-image-preview');
var uploadFilterControls = document.querySelector('.upload-filter-controls');
var uploadResizeControls = uploadOverlay.querySelector('.upload-resize-controls');

function changeAriaAttribute(isOpen) {
  uploadOverlay.setAttribute('aria-pressed', !isOpen);
}
function uploadOverlayKeydownHandler(evt) {
  if (window.utils.isDeactivationEvent(evt)) {
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
  if (window.utils.isActivationEvent(evt)) {
    closeUploadOverlay();
  }
});

/* функция вызывается из модуля initialize-scale.js */
window.initializeScale(uploadResizeControls, 25, 100);
/* функция вызывается из модуля initialize-filters.js */
window.initializeFilters(uploadFilterControls);

