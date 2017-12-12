'use strict';

(function () {
  var OFFSET_PIN = 4;
  var HEIGHT_PIN = 40;

  var similarPinTemplate = document.querySelector('template').content.querySelector('.map__pin');

  var renderPin = function (pin, id) {
    var pinElement = similarPinTemplate.cloneNode(true);

    pinElement.style.left = pin.location.x - OFFSET_PIN + 'px';
    pinElement.style.top = pin.location.y - HEIGHT_PIN + 'px';
    pinElement.querySelector('img').src = pin.author.avatar;
    pinElement.dataset.id = id;

    return pinElement;
  };

  var pinFragment = document.createDocumentFragment();

  for (var k = 0; k < window.data.offers.length; k++) {
    pinFragment.appendChild(renderPin(window.data.offers[k], k));
  }

  var findMapPin = function (el, cls) {
    if (el.classList.contains(cls)) {
      return el;
    } else {
      while ((el = el.parentElement) && el.classList.contains(cls)) {
        return el;
      }
    }

    return false;
  };

  var getPinId = function (activePin) {
    return activePin.getAttribute('data-id');
  };

  window.pin = {
    pinFragment: pinFragment,
    removePinActivity: function () {
      var mapPins = document.querySelectorAll('.map__pin');

      mapPins.forEach(function (mapPinItem) {
        mapPinItem.classList.remove('map__pin--active');
      });
    },
    setPinActivity: function (evt) {
      var target = evt.target;
      var mapPin = findMapPin(target, 'map__pin');

      window.pin.removePinActivity();

      if (mapPin) {
        mapPin.classList.add('map__pin--active');
        window.card.closePopup();
        window.card.openPopup(getPinId(mapPin));
      }
    }
  };
})();
