'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_LAST_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)',
  'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

var setup = document.querySelector('.setup');
var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
.content
.querySelector('.setup-similar-item');

if (setup.classList.contains('hidden')) {
  setup.classList.remove('hidden');
}

// Возвращает случайное целое число из диапозона min (включительно) и max (не включая max);
var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

// Возвращает случайное имя. Выборка выриантов берётся из массивов WIZARD_NAMES и WIZARD_LAST_NAMES.
var createWizardName = function () {
  return WIZARD_NAMES[getRandomInt(0, 8)] + ' ' + WIZARD_LAST_NAMES[getRandomInt(0, 8)];
};

// Возвращает случайный цвет.Выборка берётся из входящего массива arr.
var getRandomColor = function (arr) {
  return arr[getRandomInt(0, 6)];
};

var wizards = [{
  name: createWizardName(),
  coatColor: getRandomColor(COAT_COLORS),
  eyesColor: getRandomColor(EYES_COLORS)
},
{
  name: createWizardName(),
  coatColor: getRandomColor(COAT_COLORS),
  eyesColor: getRandomColor(EYES_COLORS)
},
{
  name: createWizardName(),
  coatColor: getRandomColor(COAT_COLORS),
  eyesColor: getRandomColor(EYES_COLORS)
},
{
  name: createWizardName(),
  coatColor: getRandomColor(COAT_COLORS),
  eyesColor: getRandomColor(EYES_COLORS)
}];

// Принимает массив объектов wizard.
// Создает копию разметки из шаблона similarWizardTemplate. Определяет цвета выбранных элементов, в соответствии со
// свойствами объектов, входящих в массив wizard.
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

setup.querySelector('.setup-similar').classList.remove('hidden');
