'use strict';

var OFFER_TITLES = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];

var OFFER_TYPES = {
  flat: 'Квартира',
  house: 'Дом',
  bungalo: 'Бунгало'
};

var OFFER_CHECKINS = ['12:00', '13:00', '14:00'];
var OFFER_CHECKOUTS = ['12:00', '13:00', '14:00'];
var OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

var MIN_PRICE = 1000;
var MAX_PRICE = 1000000;

var MIN_NUMBER_OF_ROOMS = 1;
var MAX_NUMBER_OF_ROOMS = 5;

var MIN_NUMBER_OF_GUESTS = 1;
var MAX_NUMBER_OF_GUESTS = 7;

var MIN_LOCATION_X = 300;
var MAX_LOCATION_X = 900;

var MIN_LOCATION_Y = 100;
var MAX_LOCATION_Y = 500;

var OFFSET_PIN = 4;
var HEIGHT_PIN = 40;

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function compareRandom() {
  return Math.random() - 0.5;
}

function getRandomType(types) {
  var typesArr = Object.keys(types);
  return typesArr[getRandomInt(0, typesArr.length - 1)];
}

function getRandomFeatures() {
  var mixedOfferFeatures = OFFER_FEATURES.sort(compareRandom);
  return mixedOfferFeatures.slice(0, getRandomInt(0, mixedOfferFeatures.length));
}

var mixedOfferTitles = OFFER_TITLES.sort(compareRandom);

var offers = [];

for (var i = 0; i < 8; i++) {
  var locationX = getRandomInt(MIN_LOCATION_X, MAX_LOCATION_X);
  var locationY = getRandomInt(MIN_LOCATION_Y, MAX_LOCATION_Y);
  offers[i] = {
    'author': {
      'avatar': 'img/avatars/user0' + (i + 1) + '.png'
    },

    'offer': {
      'title': mixedOfferTitles[i],
      'address': locationX + ', ' + locationY,
      'price': getRandomInt(MIN_PRICE, MAX_PRICE),
      'type': getRandomType(OFFER_TYPES),
      'rooms': getRandomInt(MIN_NUMBER_OF_ROOMS, MAX_NUMBER_OF_ROOMS),
      'guests': getRandomInt(MIN_NUMBER_OF_GUESTS, MAX_NUMBER_OF_GUESTS),
      'checkin': '' + OFFER_CHECKINS[getRandomInt(0, OFFER_CHECKINS.length - 1)],
      'checkout': '' + OFFER_CHECKOUTS[getRandomInt(0, OFFER_CHECKOUTS.length - 1)],
      'features': getRandomFeatures(),
      'description': '',
      'photos': []
    },

    'location': {
      'x': locationX,
      'y': locationY
    }
  };
}

var similarPinTemplate = document.querySelector('template').content.querySelector('.map__pin');

var similarCardTemplate = document.querySelector('template').content.querySelector('.map__card');

var renderPin = function (pin, id) {
  var pinElement = similarPinTemplate.cloneNode(true);

  pinElement.style.left = pin.location.x - OFFSET_PIN + 'px';
  pinElement.style.top = pin.location.y - HEIGHT_PIN + 'px';
  pinElement.querySelector('img').src = pin.author.avatar;
  pinElement.dataset.id = id;

  return pinElement;
};

var renderCard = function (card) {
  var cardElement = similarCardTemplate.cloneNode(true);

  cardElement.querySelector('.popup__avatar').src = card.author.avatar;
  cardElement.querySelector('.popup__title').textContent = card.offer.title;
  cardElement.querySelector('small').textContent = card.offer.address;
  cardElement.querySelector('.popup__price').innerHTML = card.offer.price + ' &#x20bd;/ночь';
  cardElement.querySelector('.popup__type').textContent = OFFER_TYPES[card.offer.type];
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

var pinFragment = document.createDocumentFragment();

for (var k = 0; k < offers.length; k++) {
  pinFragment.appendChild(renderPin(offers[k], k));
}

var parentElementPin = document.querySelector('.map__pins');

var mainPin = document.querySelector('.map__pin--main');
var mainMap = document.querySelector('.map');
var noticeForm = document.querySelector('.notice__form');
var formFieldsets = document.querySelectorAll('fieldset');

var onMainPinMouseup = function () {
  mainMap.classList.remove('map--faded');
  parentElementPin.appendChild(pinFragment);
  noticeForm.classList.remove('notice__form--disabled');
  formFieldsets.forEach(function (item, f) {
    formFieldsets[f].removeAttribute('disabled');
  });
};

mainPin.addEventListener('mouseup', onMainPinMouseup);

var onEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
    removePinActivity();
  }
};

var closePopup = function () {
  var popup = document.querySelector('.popup');

  if (popup) {
    popup.remove();
    document.removeEventListener('keydown', onEscPress);
  }
};

var parentElementCard = document.querySelector('.map');
var cardFragment = document.createDocumentFragment();

var openPopup = function (id) {
  if (Number(id) !== parseInt(id, 10) || id > offers.length) {
    return;
  }

  cardFragment.appendChild(renderCard(offers[id]));
  parentElementCard.insertBefore(cardFragment, document.querySelector('.map__filters-container'));

  var popupCloseButton = document.querySelector('.popup__close');

  document.addEventListener('keydown', onEscPress);
  popupCloseButton.addEventListener('click', function () {
    closePopup();
    removePinActivity();
  });
  popupCloseButton.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      closePopup();
      removePinActivity();
    }
  });
};

var removePinActivity = function () {
  var mapPins = document.querySelectorAll('.map__pin');

  mapPins.forEach(function (mapPinItem) {
    mapPinItem.classList.remove('map__pin--active');
  });
};

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

var setPinActivity = function (evt) {
  var target = evt.target;
  var mapPin = findMapPin(target, 'map__pin');

  removePinActivity();

  if (mapPin) {
    mapPin.classList.add('map__pin--active');
    closePopup();
    openPopup(getPinId(mapPin));
  }
};

parentElementPin.addEventListener('click', setPinActivity);
