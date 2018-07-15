'use strict';

(function () {
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)',
    'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  var form = document.querySelector('.setup-wizard-form');
  var coatColor = document.querySelector('.wizard-coat');
  var eyesColor = document.querySelector('.wizard-eyes');
  var fireballColor = document.querySelector('.setup-fireball');
  var inputCoatColor = document.querySelector('input[name="coat-color"]');
  var inputEyesColor = document.querySelector('input[name="eyes-color"]');
  var inputFireballColor = document.querySelector('input[name="fireball-color"]');

  // Принимает объект 1, массив, и объект 2.
  // Устанваливает объекту 1 цвет заливки случайным образом из массива arr и передаёт это значение в свойсвто value объекта 2.
  var toAssignColor = function (obj1, arr, obj2) {
    obj1.style.fill = window.utility.getRandomArrayItem(arr);
    obj2.value = obj1.style.fill;
  };

  // Устанавливает цвет файрбола случайным образом из массива arr.
  var toAssignFireballColor = function (arr) {
    fireballColor.style.backgroundColor = window.utility.getRandomArrayItem(arr);
    inputFireballColor.backgroundColor = fireballColor.style.backgroundColor;
  };

  // Обработчик событий клика на форме .Setup-Wizard-Form. Запускает функции из предложеных вариантов, в зависимости
  // от того, на каком элементе произошёл клик.
  var onFormClick = function (evt) {
    switch (evt.target) {
      case coatColor: toAssignColor(coatColor, COAT_COLORS, inputCoatColor);
        break;
      case eyesColor: toAssignColor(eyesColor, EYES_COLORS, inputEyesColor);
        break;
      case fireballColor: toAssignFireballColor(FIREBALL_COLORS);
        break;
    }
  };

  var onFormSubmit = function (evt) {
    window.save(new FormData(form), function (_response) {
      window.utility.setup.classList.add('hidden');
    });
    evt.preventDefault();
  };

  form.addEventListener('click', onFormClick);
  form.addEventListener('submit', onFormSubmit);

})();
