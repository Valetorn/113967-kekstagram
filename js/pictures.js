'use strict';

window.pictures = (function () {
  var pictureTemplate = document.querySelector('#picture-template');
  var picturesContainer = document.querySelector('.pictures');
  var galleryOverlayClose = document.querySelector('.gallery-overlay-close');
  return function (pictures) {
    var elementToClone = pictureTemplate.content.querySelector('.picture');
    pictures.forEach(function (element) {
      var pictureElement = elementToClone.cloneNode(true);
      pictureElement.querySelector('img').src = element.url;
      pictureElement.querySelector('.picture-likes').textContent = element.likes;
      pictureElement.querySelector('.picture-comments').textContent = element.comments.length;
      picturesContainer.appendChild(pictureElement);
      var pictureImg = pictureElement.querySelector('img').src;
      var pictureLikes = pictureElement.querySelector('.picture-likes').textContent;
      var pictureComments = pictureElement.querySelector('.picture-comments').textContent;
      var showPicturesInfo = function (evt) {
        evt.preventDefault();
        window.showGalery(pictureImg, pictureLikes, pictureComments);
      };
      pictureElement.addEventListener('click', function (evt) {
        showPicturesInfo(evt);
      });
      pictureElement.addEventListener('keydown', function (evt) {
        if (window.utils.isActivationEvent(evt)) {
          showPicturesInfo(evt);
          galleryOverlayClose.focus();
        }
      });
    });
  };
})();
