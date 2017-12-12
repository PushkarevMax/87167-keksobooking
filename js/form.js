'use strict';

(function () {
  var timeinSelect = document.querySelector('#timein');
  var timeoutSelect = document.querySelector('#timeout');

  var syncSelect = function (select1, select2) {
    if (!select1 || !select2) {
      return false;
    }

    var val = select1.value;
    var options = select2.getElementsByTagName('option');

    for (var s = 0; s < options.length; s++) {
      if (options[s].value === val) {
        options[s].selected = true;
      }
    }

    return true;
  };

  timeinSelect.addEventListener('change', function () {
    syncSelect(timeinSelect, timeoutSelect);
  });
  timeoutSelect.addEventListener('change', function () {
    syncSelect(timeoutSelect, timeinSelect);
  });

  var typeSelect = document.querySelector('#type');

  var selectApartmentType = function () {
    var options = typeSelect.getElementsByTagName('option');

    for (var s = 0; s < options.length; s++) {
      if (options[s].selected === true) {
        return options[s].value;
      }
    }

    return true;
  };

  selectApartmentType();

  var priceInput = document.querySelector('#price');
  var APARTMENT_TYPE = {
    bungalo: {minPrice: 0},
    flat: {minPrice: 1000},
    house: {minPrice: 5000},
    palace: {minPrice: 10000}
  };

  var setMinimumPrice = function () {
    var apartmentType = selectApartmentType();
    var apartmentMinPrice = APARTMENT_TYPE[apartmentType].minPrice;
    priceInput.setAttribute('min', apartmentMinPrice);
  };

  setMinimumPrice();

  typeSelect.addEventListener('change', function () {
    selectApartmentType();
    setMinimumPrice();
  });

  var ROOM_CAPACITY = {
    room1: {
      roomCount: 1,
      capacity: [1]
    },
    room2: {
      roomCount: 2,
      capacity: [1, 2]
    },
    room3: {
      roomCount: 3,
      capacity: [1, 2, 3]
    },
    room100: {
      roomCount: 100,
      capacity: [0]
    }
  };

  var roomNumberSelect = document.querySelector('#room_number');

  var selectRoomNumber = function () {
    var options = roomNumberSelect.getElementsByTagName('option');

    for (var s = 0; s < options.length; s++) {
      if (options[s].selected === true) {
        return options[s].value;
      }
    }

    return true;
  };

  selectRoomNumber();

  var capacitySelect = document.querySelector('#capacity');

  var setCapacityRoom = function () {
    var roomNumber = selectRoomNumber();
    var capacityRoom = ROOM_CAPACITY['room' + roomNumber].capacity;
    var options = capacitySelect.getElementsByTagName('option');

    for (var s = 0; s < options.length; s++) {
      if (capacityRoom.indexOf(parseInt(options[s].value, 10)) >= 0) {
        options[s].removeAttribute('disabled');
        options[s].selected = true;
      } else {
        options[s].setAttribute('disabled', 'disabled');
      }
    }

    return true;
  };

  setCapacityRoom();

  roomNumberSelect.addEventListener('change', function () {
    setCapacityRoom();
  });
})();
