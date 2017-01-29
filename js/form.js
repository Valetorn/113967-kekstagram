'use strict';
var uploadOverlay = document.querySelector('.upload-overlay');
var uploadSelectImage = document.getElementById('upload-select-image');
var uploadFile = document.getElementById('upload-file');
var uploadFormCancel = uploadOverlay.querySelector('.upload-form-cancel');
var filterImagePreview = document.querySelector('.filter-image-preview');
var controls = document.querySelectorAll('.upload-filter input[type = "radio"]');
var filterDefault = document.getElementById('upload-filter-none');

uploadFile.addEventListener('change', function () {
  uploadSelectImage.classList.add('invisible');
  uploadOverlay.classList.remove('invisible');
});
uploadFormCancel.addEventListener('click', function () {
  uploadOverlay.classList.add('invisible');
  uploadSelectImage.classList.remove('invisible');
});

for (var i = 0; i < controls.length; i++) {
  clickControl(controls[i]);
}

function getFilter(control) {
  for (i = 0; i < controls.length; i++) {
    filterImagePreview.classList.remove('filter-' + controls[i].value);
  }
  if (filterImagePreview) {
    filterImagePreview.classList.add('filter-' + control.value);
  }
}
function clickControl(control) {
  control.addEventListener('click', function () {
    getFilter(control);
  });
}

getFilter(filterDefault);

