'use strict';

window.initializeFilters = (function () {
  var controls = document.querySelectorAll('.upload-filter-controls input[type = "radio"]');
  return function (evt) {
    for (var i = 0; i < controls.length; i++) {
      window.filterImagePreview.classList.remove('filter-' + controls[i].value);
    }
    var filter = evt.target;
    if (filter.tagName === 'INPUT') {
      window.filterImagePreview.classList.add('filter-' + filter.value);
    }
    if (filter.tagName === 'LABEL') {
      var inputFilter = document.getElementById(filter.htmlFor);
      inputFilter.checked = true;
      window.filterImagePreview.classList.add('filter-' + inputFilter.value);
    }
  };
})();
