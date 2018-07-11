'use strict';

(function () {

  var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var WIZARD_LAST_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var NUMBER_OF_WIZARDS = 4;

  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var similarListElement = document.querySelector('.setup-similar-list');

  // Возвращает случайное имя. Выборка выриантов берётся из массивов WIZARD_NAMES и WIZARD_LAST_NAMES.
  var createWizardName = function () {
    return window.utility.getRandomArrayItem(WIZARD_NAMES) + ' ' + window.utility.getRandomArrayItem(WIZARD_LAST_NAMES);
  };

  // Возварщает массив объектов. Принимает количество объектов.
  var createArreyOfObject = function (numberOfObject) {
    var array = [];
    for (var i = 0; i < numberOfObject; i++) {
      array.push({
        name: createWizardName(),
        coatColor: window.utility.getRandomArrayItem(window.utility.COAT_COLORS),
        eyesColor: window.utility.getRandomArrayItem(window.utility.EYES_COLORS)
      });
    }
    return array;
  };

  // Принимает массив объектов wizard.
  // Создает копию разметки из шаблона similarWizardTemplate. Определяет текстовое содержимое и
  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
    return wizardElement;
  };

  var wizards = createArreyOfObject(NUMBER_OF_WIZARDS);

  var fragment = document.createDocumentFragment();
  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }

  similarListElement.appendChild(fragment);

})();
