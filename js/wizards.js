'use strict';

(function () {

  var NUMBER_OF_WIZARDS = 4;

  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var similarListElement = document.querySelector('.setup-similar-list');


  // Принимает массив объектов wizard.
  // Создает копию разметки из шаблона similarWizardTemplate. Определяет текстовое содержимое и
  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;
    return wizardElement;
  };

  // Обработчик успешно загрузки данных.
  // Отрисовывает 4 случайных волшебника из полученного массива волшебников.
  var onSuccessLoad = function (wizards) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < NUMBER_OF_WIZARDS; i++) {
      var randomWizard = window.utility.getRandomArrayItem(wizards);
      fragment.appendChild(renderWizard(randomWizard));
    }
    similarListElement.appendChild(fragment);
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

})();
