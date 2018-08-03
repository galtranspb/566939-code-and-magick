'use strict';

(function () {
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)',
    'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  var coatColor;
  var eyesColor;
  var wizards = [];

  var form = document.querySelector('.setup-wizard-form');
  var wizardCoatElement = document.querySelector('.wizard-coat');
  var wizardEyesElement = document.querySelector('.wizard-eyes');
  var wizardFireballElement = document.querySelector('.setup-fireball');
  var inputCoatColor = document.querySelector('input[name="coat-color"]');
  var inputEyesColor = document.querySelector('input[name="eyes-color"]');
  var inputFireballColor = document.querySelector('input[name="fireball-color"]');

  var updateWizards = function () {
    var sameCoatAndEyesWizards = wizards.filter(function (it) {
      return it.colorCoat === coatColor && it.colorEyes === eyesColor;
    });

    var sameCoatWizards = wizards.filter(function (it) {
      return it.colorCoat === coatColor;
    });
    var sameEyesWizards = wizards.filter(function (it) {
      return it.colorEyes === eyesColor;
    });

    var filteredWizards = sameCoatAndEyesWizards;
    filteredWizards = filteredWizards.concat(sameCoatWizards);
    filteredWizards = filteredWizards.concat(sameEyesWizards);
    filteredWizards = filteredWizards.concat(wizards);

    var uniqueWizards = filteredWizards.filter(function (it, i) {
      return filteredWizards.indexOf(it) === i;
    });

    window.render(uniqueWizards);
  };

  // Принимает объект 1, массив, и объект 2.
  // Устанваливает объекту 1 цвет заливки случайным образом из массива arr и передаёт это значение в свойсвто value объекта 2.
  var onWizardCoatElementClick = function (arr) {
    var newColor = window.utility.getRandomArrayItem(arr);
    wizardCoatElement.style.fill = newColor;
    inputCoatColor.value = newColor;
    coatColor = newColor;
    updateWizards();
  };

  var onWizardEyesElementClick = function (arr) {
    var newColor = window.utility.getRandomArrayItem(arr);
    wizardEyesElement.style.fill = newColor;
    inputEyesColor.value = newColor;
    coatColor = newColor;
    updateWizards();
  };

  // Устанавливает цвет файрбола случайным образом из массива arr.
  var onWizardFireballElementClick = function (arr) {
    wizardFireballElement.style.backgroundColor = window.utility.getRandomArrayItem(arr);
    inputFireballColor.backgroundColor = wizardFireballElement.style.backgroundColor;
  };

  // Обработчик событий клика на форме .Setup-Wizard-Form. Запускает функции из предложеных вариантов, в зависимости
  // от того, на каком элементе произошёл клик.
  var onFormClick = function (evt) {
    switch (evt.target) {
      case wizardCoatElement:
        onWizardCoatElementClick(COAT_COLORS);
        break;
      case wizardEyesElement:
        onWizardEyesElementClick(EYES_COLORS);
        break;
      case wizardFireballElement:
        onWizardFireballElementClick(FIREBALL_COLORS);
        break;
    }
  };

  var onFormSubmit = function (evt) {
    window.backend.save(new FormData(form), function () {
      window.utility.setup.classList.add('hidden');
    });
    evt.preventDefault();
  };

  // Обработчик успешно загрузки данных.
  var onSuccessLoad = function (data) {
    wizards = data;
    updateWizards();
  };

  // Обработчик ошибки, при загрузке данных.
  // Выводит соответсвующее ошибке сообщение.
  var onErrorLoad = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.backend.load(onSuccessLoad, onErrorLoad);
  form.addEventListener('click', onFormClick);
  form.addEventListener('submit', onFormSubmit);

})();
