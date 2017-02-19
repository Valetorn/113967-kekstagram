'use strict';

var uploadOverlay = document.querySelector('.upload-overlay');
var uploadSelectImage = document.getElementById('upload-select-image');
var uploadFile = document.getElementById('upload-file');
var uploadFormCancel = uploadOverlay.querySelector('.upload-form-cancel');
window.filterImagePreview = document.querySelector('.filter-image-preview');
var uploadFilterControls = document.querySelector('.upload-filter-controls');
var uploadResizeControls = uploadOverlay.querySelector('.upload-resize-controls');
var oldFilter = null;

var changeAriaAttribute = function (isOpen) {
  uploadOverlay.setAttribute('aria-pressed', !isOpen);
};
var uploadOverlayKeydownHandler = function (evt) {
  if (window.utils.isDeactivationEvent(evt)) {
    closeUploadOverlay();
    changeAriaAttribute(false);
  }
};
var openUploadOverlay = function () {
  uploadSelectImage.classList.add('invisible');
  uploadOverlay.classList.remove('invisible');
  document.addEventListener('keydown', uploadOverlayKeydownHandler);
  changeAriaAttribute(true);
};
var closeUploadOverlay = function () {
  uploadOverlay.classList.add('invisible');
  uploadSelectImage.classList.remove('invisible');
  document.removeEventListener('keydown', uploadOverlayKeydownHandler);
  changeAriaAttribute(false);
};
window.applyFilter = function (newFilter) {
  if (oldFilter) {
    window.filterImagePreview.classList.remove('filter-' + oldFilter);
  }
  window.filterImagePreview.classList.add('filter-' + newFilter);
  oldFilter = newFilter;
};
window.adjustScale = function (scale) {
  window.filterImagePreview.style.transform = 'scale(' + scale + ')';
};

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

