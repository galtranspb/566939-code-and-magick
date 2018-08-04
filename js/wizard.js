'use strict';

(function () {
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)',
    'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  var form = document.querySelector('.setup-wizard-form');
  var wizardCoatElement = form.querySelector('.wizard-coat');
  var wizardEyesElement = form.querySelector('.wizard-eyes');
  var wizardFireballElement = form.querySelector('.setup-fireball');
  var inputCoatColor = form.querySelector('input[name="coat-color"]');
  var inputEyesColor = form.querySelector('input[name="eyes-color"]');
  var inputFireballColor = form.querySelector('input[name="fireball-color"]');

  window.wizard = {
    onEyesChange: function () {},
    onCoatChange: function () {}
  };

  // Возвращает случайное целое число из диапозона min (включительно) и max (не включая max);
  var getRandomIntByRange = function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  // Возвращает случайный элемент массива. Выборка берётся из входящего массива arr.
  var getRandomArrayItem = function (arr) {
    return arr[getRandomIntByRange(0, arr.length)];
  };

  // Принимает массив - возможные варианты цвета плаща.
  // Устанавливает случайный цвет плаща из входящего массива.
  // Определяет этот цвет на волшебнике, в значение поля ввода цвета плаща и
  // запускает обраюотчик события change на изменение цвета плаща.
  var onWizardCoatElementClick = function (arr) {
    var newColor = getRandomArrayItem(arr);
    wizardCoatElement.style.fill = newColor;
    inputCoatColor.value = newColor;
    window.wizard.onCoatChange(newColor);
  };

  // Принимает массив - возможные варианты цвета глаз.
  // Устанавливает случайный цвет глаз из входящего массива.
  // Определяет этот цвет на волшебнике, в значение поля ввода цвета глаз и
  // запускает обработчик события change на изменение цвета глаз.
  var onWizardEyesElementClick = function (arr) {
    var newColor = getRandomArrayItem(arr);
    wizardEyesElement.style.fill = newColor;
    inputEyesColor.value = newColor;
    window.wizard.onEyesChange(newColor);
  };

  // Принимает массив - возможные варианты цвета файерболла.
  // Устанавливает цвет файрбола случайным образом из массива arr.
  // Определяет этот цвет фоновым цветом файерболла волшебника и в значение поля ввода файерболла.
  var onWizardFireballElementClick = function (arr) {
    wizardFireballElement.style.backgroundColor = getRandomArrayItem(arr);
    inputFireballColor.backgroundColor = wizardFireballElement.style.backgroundColor;
  };

  // Обработчик событий клика на форме setup-wizard-form. Через делегирование запускает обработчики клика
  // на элементах волшебника: плащ, глаза, фйерболл.
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

  // Обработчик отправки формы.
  // Отправляет данные(выбранные параметры волшебника) на сервер. Отменяет отправку формы.
  var onFormSubmit = function (evt) {
    window.backend.save(new FormData(form), function () {
      window.setup.setup.classList.add('hidden');
    });
    evt.preventDefault();
  };

  form.addEventListener('click', onFormClick);
  form.addEventListener('submit', onFormSubmit);

  return window.wizard;

})();
