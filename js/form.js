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

  // Возвращает случайное целое число из диапозона min (включительно) и max (не включая max);
  var getRandomIntByRange = function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  // Возвращает случайный элемент массива. Выборка берётся из входящего массива arr.
  var getRandomArrayItem = function (arr) {
    return arr[getRandomIntByRange(0, arr.length)];
  };

  // Сортирует похожих волшебников и обновляет их на странице.
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

  // Принимает массив - возможные варианты цвета плаща.
  // Устанавливает случайный цвет плаща из входящего массива.
  // Определяет этот цвет на волшебнике, в значение поля ввода цвета плаща, в переменную coatColor и
  // запускает функцию обновления похожих волшебников.
  var onWizardCoatElementClick = function (arr) {
    var newColor = getRandomArrayItem(arr);
    wizardCoatElement.style.fill = newColor;
    inputCoatColor.value = newColor;
    coatColor = newColor;
    updateWizards();
  };

  // Принимает массив - возможные варианты цвета глаз.
  // Устанавливает случайный цвет глаз из входящего массива.
  // Определяет этот цвет на волшебнике, в значение поля ввода цвета глаз, в переменную eyesColor и
  // запускает функцию обновления похожих волшебников.
  var onWizardEyesElementClick = function (arr) {
    var newColor = getRandomArrayItem(arr);
    wizardEyesElement.style.fill = newColor;
    inputEyesColor.value = newColor;
    eyesColor = newColor;
    updateWizards();
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

  // Обработчик успешно загрузки данных.
  // Принимает массив волшебников. Обновляет похожих волшебников.
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
