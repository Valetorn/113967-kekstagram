'use strict';

window.pictures = (function () {
  var pictureTemplate = document.querySelector('#picture-template');
  var picturesContainer = document.querySelector('.pictures');
  var filters = document.querySelector('.filters');
  var DATA_URL = 'https://intensive-javascript-server-myophkugvq.now.sh/kekstagram/data';
  var setDataPictures = function (pictures) {
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
          window.setFocus();
        }
      });
    });
    filtersSort(pictures);
  };
  var filtersSort = function (pictures) {
    filters.classList.remove('hidden');
    var newPictures = [];
    filters.addEventListener('click', function (evt) {
      switch (evt.target.id) {
        case('filter-popular'):
          window.utils.cleanContainer(picturesContainer);
          setDataPictures(pictures);
          break;
        case('filter-new'):
          window.utils.cleanContainer(picturesContainer);
          newPictures = window.utils.getRandomArray(pictures, 10);
          setDataPictures(newPictures);
          break;
        case('filter-discussed'):
          window.utils.cleanContainer(picturesContainer);
          setDataPictures(sortArray(pictures));
          break;
      }
    });
  };
  var sortArray = function (array) {
    var sortPictures = array.slice().sort(function (left, right) {
      return left.comments.length - right.comments.length;
    });
    return sortPictures;
  };
  window.load(DATA_URL, setDataPictures);
})();
