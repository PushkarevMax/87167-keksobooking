'use strict';

(function () {
  window.util = {
    getRandomInt: function (min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    compareRandom: function () {
      return Math.random() - 0.5;
    }
  };
})();
