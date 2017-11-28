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

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function compareRandom(a, b) {
  return Math.random() - 0.5;
}

function getRandomType(types) {
  var typesArr = [];
  for (var key in types) {
    typesArr.push(key);
  }
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

var renderPin = function (pin) {
  var pinElement = similarPinTemplate.cloneNode(true);

  pinElement.style.left = pin.location.x + 'px';
  pinElement.style.top = pin.location.y + 'px';
  pinElement.querySelector('img').src = pin.author.avatar;

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
  for (var i = 0; i < card.offer.features.length; i++) {
    var offerItem = document.createElement('li');
    offerItem.className = 'feature feature--' + card.offer.features[i];
    cardElement.querySelector('.popup__features').appendChild(offerItem);
  }
  cardElement.querySelector('.popup__description').textContent = card.offer.description;

  return cardElement;
};

var pinFragment = document.createDocumentFragment();

var cardFragment = document.createDocumentFragment();

for (var i = 0; i < offers.length; i++) {
  pinFragment.appendChild(renderPin(offers[i]));
}

cardFragment.appendChild(renderCard(offers[0]));

var parentElement = document.querySelector('.map');

parentElement.appendChild(pinFragment);
parentElement.insertBefore(cardFragment, document.querySelector('.map__filters-container'));


