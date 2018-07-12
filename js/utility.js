'use strict';

(function () {

  // Возвращает случайное целое число из диапозона min (включительно) и max (не включая max);
  var getRandomIntByRange = function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  // Возвращает случайный элемент массива. Выборка берётся из входящего массива arr.
  var getRandomArrayItem = function (arr) {
    return arr[getRandomIntByRange(0, arr.length)];
  }

  window.utility = {
    COAT_COLORS: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)',
    'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
    EYES_COLORS: ['black', 'red', 'blue', 'yellow', 'green'],
    setup: document.querySelector('.setup'),
    dialog: document.querySelector('.setup-user-pic'),

    getRandomIntByRange: getRandomIntByRange,
    getRandomArrayItem: getRandomArrayItem
  };

})();
