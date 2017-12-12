'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  var onEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      window.card.closePopup();
      window.pin.removePinActivity();
    }
  };

  var similarCardTemplate = document.querySelector('template').content.querySelector('.map__card');

  var renderCard = function (card) {
    var cardElement = similarCardTemplate.cloneNode(true);

    cardElement.querySelector('.popup__avatar').src = card.author.avatar;
    cardElement.querySelector('.popup__title').textContent = card.offer.title;
    cardElement.querySelector('small').textContent = card.offer.address;
    cardElement.querySelector('.popup__price').innerHTML = card.offer.price + ' &#x20bd;/ночь';
    cardElement.querySelector('.popup__type').textContent = window.data.offerTypes[card.offer.type];
    cardElement.querySelector('.popup__rooms').textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
    cardElement.querySelector('.popup__checkin').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
    cardElement.querySelector('.popup__features').innerHTML = '';
    for (var j = 0; j < card.offer.features.length; j++) {
      var offerItem = document.createElement('li');
      offerItem.className = 'feature feature--' + card.offer.features[j];
      cardElement.querySelector('.popup__features').appendChild(offerItem);
    }
    cardElement.querySelector('.popup__description').textContent = card.offer.description;

    return cardElement;
  };

  var parentElementCard = document.querySelector('.map');
  var cardFragment = document.createDocumentFragment();

  window.card = {
    openPopup: function (id) {
      if (Number(id) !== parseInt(id, 10) || id > window.data.offers.length) {
        return;
      }

      cardFragment.appendChild(renderCard(window.data.offers[id]));
      parentElementCard.insertBefore(cardFragment, document.querySelector('.map__filters-container'));

      var popupCloseButton = document.querySelector('.popup__close');

      document.addEventListener('keydown', onEscPress);
      popupCloseButton.addEventListener('click', function () {
        window.card.closePopup();
        window.pin.removePinActivity();
      });
      popupCloseButton.addEventListener('keydown', function (evt) {
        if (evt.keyCode === ENTER_KEYCODE) {
          window.card.closePopup();
          window.pin.removePinActivity();
        }
      });
    },
    closePopup: function () {
      var popup = document.querySelector('.popup');

      if (popup) {
        popup.remove();
        document.removeEventListener('keydown', onEscPress);
      }
    }
  };
})();
