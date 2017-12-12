'use strict';

var parentElementPin = document.querySelector('.map__pins');

parentElementPin.addEventListener('click', window.pin.setPinActivity);

var mainPin = document.querySelector('.map__pin--main');
var mainMap = document.querySelector('.map');
var noticeForm = document.querySelector('.notice__form');
var formFieldsets = document.querySelectorAll('fieldset');

var onMainPinMouseup = function () {
  mainMap.classList.remove('map--faded');
  parentElementPin.appendChild(window.pin.pinFragment);
  noticeForm.classList.remove('notice__form--disabled');
  formFieldsets.forEach(function (item, f) {
    formFieldsets[f].removeAttribute('disabled');
  });
};

mainPin.addEventListener('mouseup', onMainPinMouseup);
