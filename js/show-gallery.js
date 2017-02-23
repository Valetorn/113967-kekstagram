'use strict';

window.showGalery = (function () {
  var galleryOverlay = document.querySelector('.gallery-overlay');
  var galleryImg = galleryOverlay.querySelector('.gallery-overlay-image');
  var galleryLike = galleryOverlay.querySelector('.likes-count');
  var galleryComments = galleryOverlay.querySelector('.comments-count');
  var galleryOverlayClose = galleryOverlay.querySelector('.gallery-overlay-close');
  return function (img, likes, comments) {
    galleryOverlay.classList.remove('invisible');
    galleryImg.src = img;
    galleryLike.textContent = likes;
    galleryComments.textContent = comments;
    var galleryOverlayHide = function () {
      galleryOverlay.classList.add('invisible');
    };
    galleryOverlayClose.addEventListener('click', galleryOverlayHide);
    galleryOverlayClose.addEventListener('keydown', function (evt) {
      if (window.utils.isActivationEvent(evt)) {
        galleryOverlayHide();
      }
    });
    document.addEventListener('keydown', function (evt) {
      if (window.utils.isDeactivationEvent(evt)) {
        galleryOverlayHide();
      }
    });
  };
})();
