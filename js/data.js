'use strict';

(function () {
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

  function getRandomType(types) {
    var typesArr = Object.keys(types);
    return typesArr[window.util.getRandomInt(0, typesArr.length - 1)];
  }

  function getRandomFeatures() {
    var mixedOfferFeatures = OFFER_FEATURES.sort(window.util.compareRandom);
    return mixedOfferFeatures.slice(0, window.util.getRandomInt(0, mixedOfferFeatures.length));
  }

  var mixedOfferTitles = OFFER_TITLES.sort(window.util.compareRandom);

  var offers = [];

  for (var i = 0; i < 8; i++) {
    var locationX = window.util.getRandomInt(MIN_LOCATION_X, MAX_LOCATION_X);
    var locationY = window.util.getRandomInt(MIN_LOCATION_Y, MAX_LOCATION_Y);
    offers[i] = {
      'author': {
        'avatar': 'img/avatars/user0' + (i + 1) + '.png'
      },

      'offer': {
        'title': mixedOfferTitles[i],
        'address': locationX + ', ' + locationY,
        'price': window.util.getRandomInt(MIN_PRICE, MAX_PRICE),
        'type': getRandomType(OFFER_TYPES),
        'rooms': window.util.getRandomInt(MIN_NUMBER_OF_ROOMS, MAX_NUMBER_OF_ROOMS),
        'guests': window.util.getRandomInt(MIN_NUMBER_OF_GUESTS, MAX_NUMBER_OF_GUESTS),
        'checkin': '' + OFFER_CHECKINS[window.util.getRandomInt(0, OFFER_CHECKINS.length - 1)],
        'checkout': '' + OFFER_CHECKOUTS[window.util.getRandomInt(0, OFFER_CHECKOUTS.length - 1)],
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

  window.data = {
    offers: offers,
    offerTypes: OFFER_TYPES
  };
})();
