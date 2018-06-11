'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_LAST_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)',
  'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var NUMBER_OF_WIZARDS = 4;

var setup = document.querySelector('.setup');
var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

// Возвращает случайное целое число из диапозона min (включительно) и max (не включая max);
var getRandomIntByRange = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

// Возвращает случайное имя. Выборка выриантов берётся из массивов WIZARD_NAMES и WIZARD_LAST_NAMES.
var createWizardName = function () {
  return WIZARD_NAMES[getRandomIntByRange(0, WIZARD_NAMES.length)] +
  ' ' + WIZARD_LAST_NAMES[getRandomIntByRange(0, WIZARD_LAST_NAMES.length)];
};

// Возвращает случайный элемент массива. Выборка берётся из входящего массива arr.
var getRandomArrayItem = function (arr) {
  return arr[getRandomIntByRange(0, arr.length)];
};

// Возварщает массив объектов. Принимает количество объектов.
var createArreyOfObject = function (numberOfObject) {
  var array = [];
  for (var i = 0; i < numberOfObject; i++) {
    var object = {
      name: createWizardName(),
      coatColor: getRandomArrayItem(COAT_COLORS),
      eyesColor: getRandomArrayItem(EYES_COLORS)
    };
    array.push(object);
  }
  return array;
};

var wizards = createArreyOfObject(NUMBER_OF_WIZARDS);

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

var fragment = document.createDocumentFragment();
for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}
similarListElement.appendChild(fragment);

if (setup.classList.contains('hidden')) {
  setup.classList.remove('hidden');
}
setup.querySelector('.setup-similar').classList.remove('hidden');
