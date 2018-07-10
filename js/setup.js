'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_LAST_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)',
  'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var NUMBER_OF_WIZARDS = 4;
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

var setup = document.querySelector('.setup');
var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var setupOpen = document.querySelector('.setup-open');
var setupClose = document.querySelector('.setup-close');
var setupUserName = document.querySelector('.setup-user-name');
var coatColor = setup.querySelector('.wizard-coat');
var eyesColor = setup.querySelector('.wizard-eyes');
var fireballColor = setup.querySelector('.setup-fireball');
var inputCoatColor = setup.querySelector('input[name="coat-color"]');
var inputEyesColor = setup.querySelector('input[name="eyes-color"]');
var inputFireballColor = setup.querySelector('input[name="fireball-color"]');
var setupWizardForm = document.querySelector('.setup-wizard-form');

var dialog = setup.querySelector('.setup-user-pic');

// *****************************************Определения функций******************************************

// Возвращает случайное целое число из диапозона min (включительно) и max (не включая max);
var getRandomIntByRange = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

// Возвращает случайный элемент массива. Выборка берётся из входящего массива arr.
var getRandomArrayItem = function (arr) {
  return arr[getRandomIntByRange(0, arr.length)];
};

// Возвращает случайное имя. Выборка выриантов берётся из массивов WIZARD_NAMES и WIZARD_LAST_NAMES.
var createWizardName = function () {
  return getRandomArrayItem(WIZARD_NAMES) + ' ' + getRandomArrayItem(WIZARD_LAST_NAMES);
};

// Возварщает массив объектов. Принимает количество объектов.
var createArreyOfObject = function (numberOfObject) {
  var array = [];
  for (var i = 0; i < numberOfObject; i++) {
    array.push({
      name: createWizardName(),
      coatColor: getRandomArrayItem(COAT_COLORS),
      eyesColor: getRandomArrayItem(EYES_COLORS)
    });
  }
  return array;
};

// Принимает массив объектов wizard.
// Создает копию разметки из шаблона similarWizardTemplate. Определяет текстовое содержимое и
// цвета выбранных элементов, в соответствии со свойствами объектов, входящих в массив wizard.
var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

// Убирает класс hidden у объекта setup и добавляет обработчик собития keydown на объект документ.
var openPopup = function () {
  setup.classList.remove('hidden');
  setup.querySelector('.setup-similar').classList.remove('hidden');
  dialog.style.zIndex = 3;
  document.addEventListener('keydown', onPopupEscPress);
};

// Добаляет класс hidden объекту setup и убирает обработчик события keydown у объекта document.
var closePopup = function () {
  setup.classList.add('hidden');
  setup.querySelector('.setup-similar').classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
  setup.style.top = '';
  setup.style.left = '';
};

// Принимает событие event. Если нажата клавиша ESC, то запускает функцию closePopup.
var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE && document.activeElement !== setupUserName) {
    closePopup();
  }
};

// Принимает объект 1, массив, и объект 2.
// Устанваливает объекту 1 цвет заливки случайным образом из массива arr и передаёт это значение в свойсвто value объекта 2.
var toAssignColor = function (obj1, arr, obj2) {
  obj1.style.fill = getRandomArrayItem(arr);
  obj2.value = obj1.style.fill;
};

// Устанавливает цвет файрбола случайным образом из массива arr.
var toAssignFireballColor = function (arr) {
  fireballColor.style.backgroundColor = getRandomArrayItem(arr);
  inputFireballColor.backgroundColor = fireballColor.style.backgroundColor;
};

// Обработчик событий клика на форме .Setup-Wizard-Form. Запускает функции из предложеных вариантов, в зависимости
// от того, на каком элементе произошёл клик.
var onSetupWizardFormClick = function (evt) {
  switch (evt.target) {
    case coatColor: toAssignColor(coatColor, COAT_COLORS, inputCoatColor);
      break;
    case eyesColor: toAssignColor(eyesColor, EYES_COLORS, inputEyesColor);
      break;
    case fireballColor: toAssignFireballColor(FIREBALL_COLORS);
      break;
  }
};

// *****************************задание 5*******************************************







// Обработчик события mousedown.
// Отменяет действие по умолчанию, указывает стартовые координаты, добалвяет на document обработчики onMouseMove и onMouseUp.
var onDialogMousedown = function (evt) {
  evt.preventDefault();

  var startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };
  var dragged = false;

  // Принимает событие mousemove.
  // Определяет перемещение мыши по Х/У и устанавливает их в свойство стиля соответственно left/top элемента setup.
  var onDocumentMousemove = function (evt) {
    evt.preventDefault();
    dragged = true;

    var shift = {
      x: startCoords.x - evt.clientX,
      y: startCoords.y - evt.clientY
    };

    startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    setup.style.top = (setup.offsetTop - shift.y) + 'px';
    setup.style.left = (setup.offsetLeft - shift.x) + 'px';
  };

  // Обработчик события mouseup. Отменяет действие по умолчанию. Снимает обработчики mousemove, mouseup.
  // Если есть перемещение курсора, то вешает обработчик клика onSetupUserPicClick на элемент dialog.
  var onDocumentMouseup = function (evt) {
    evt.preventDefault();
    document.removeEventListener('mousemove', onDocumentMousemove);
    document.removeEventListener('mouseup', onDocumentMouseup);

    if (dragged) {
    // Обработчик события клика по элементу .setup-user-pic
    // Отменяет действие по умолчанию - открытие окна загрузки файла. Убирает обработчик клика по элементу dialog.
    var onSetupUserPicClick = function (evt) {
      evt.preventDefault();
      dialog.removeEventListener('click', onSetupUserPicClick);
    };
    dialog.addEventListener('click', onSetupUserPicClick);
  }
};

document.addEventListener('mousemove', onDocumentMousemove);
document.addEventListener('mouseup', onDocumentMouseup);
};

// ******************************Объявления функций**************************************

var wizards = createArreyOfObject(NUMBER_OF_WIZARDS);

var fragment = document.createDocumentFragment();
for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}
similarListElement.appendChild(fragment);

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

setupWizardForm.addEventListener('click', onSetupWizardFormClick);

dialog.addEventListener('mousedown', onDialogMousedown);
