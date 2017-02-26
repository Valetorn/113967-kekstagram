'use strict';

window.pictures = (function () {
  var pictureTemplate = document.querySelector('#picture-template');
  var picturesContainer = document.querySelector('.pictures');
  var filters = document.querySelector('.filters');
  var DATA_URL = 'https://intensive-javascript-server-myophkugvq.now.sh/kekstagram/data';

  var getData = function (data) {
    setDataPictures(data);
    filters.classList.remove('hidden');
    choseFilters(data);
  };
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
  };
  var choseFilters = function (pictures) {
    var showFilters = function (evt) {
      switch (evt.target.id) {
        case ('filter-popular') :
          window.utils.cleanContainer(picturesContainer);
          setDataPictures(pictures);
          break;
        case ('filter-new'):
          window.utils.cleanContainer(picturesContainer);
          setDataPictures(randomFilter(pictures));
          break;
        case ('filter-discussed'):
          window.utils.cleanContainer(picturesContainer);
          setDataPictures(sortFilter(pictures));
          break;
      }
    };
    filters.addEventListener('click', function (evt) {
      showFilters(evt);
    });
    filters.addEventListener('keydown', function (evt) {
      if (window.utils.isActivationEvent(evt)) {
        evt.target.click();
        showFilters(evt);
      }
    });
    var sortFilter = function (picturesForDiscussed) {
      var discussedPictures = Array.from(picturesForDiscussed);
      return sortArray(discussedPictures);
    };
    var randomFilter = function (picturesForNew) {
      var newPictures = Array.from(picturesForNew);
      return window.utils.getRandomArray(newPictures, 10);
    };
  };
  var sortArray = function (array) {
    var sortPictures = array.slice().sort(function (left, right) {
      return right.comments.length - left.comments.length;
    });
    return sortPictures;
  };
  window.load(DATA_URL, getData);
})();
