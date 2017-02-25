'use strict';

var uploadOverlay = document.querySelector('.upload-overlay');
var uploadSelectImage = document.getElementById('upload-select-image');
var uploadFile = document.getElementById('upload-file');
var uploadFormCancel = uploadOverlay.querySelector('.upload-form-cancel');
var filterImagePreview = document.querySelector('.filter-image-preview');
var uploadFilterControls = document.querySelector('.upload-filter-controls');
var uploadResizeControls = uploadOverlay.querySelector('.upload-resize-controls');
var uploadFilter = document.getElementById('upload-filter');
var oldFilter = null;
var filterDefault = document.getElementById('upload-filter-none').value;
var scaleDefault = 100;

var changeAriaAttribute = function (isOpen) {
  uploadOverlay.setAttribute('aria-pressed', !isOpen);
};
var uploadOverlayKeydownHandler = function (evt) {
  if (window.utils.isDeactivationEvent(evt)) {
    closeUploadOverlay();
    uploadFilter.reset();
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
  applyFilter(filterDefault);
  adjustScale(scaleDefault);
};
var applyFilter = function (newFilter) {
  if (oldFilter) {
    filterImagePreview.classList.remove('filter-' + oldFilter);
  }
  filterImagePreview.classList.add('filter-' + newFilter);
  oldFilter = newFilter;
};
var adjustScale = function (scale) {
  filterImagePreview.style.transform = 'scale(' + parseInt(scale, 10) / 100 + ')';
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

window.initializeScale(uploadResizeControls, 25, scaleDefault, adjustScale);
window.initializeFilters(uploadFilterControls, applyFilter);

