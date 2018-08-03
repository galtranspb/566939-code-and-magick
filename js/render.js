'use strict';

(function () {

  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var similar = document.querySelector('.setup-similar');
  var similarList = document.querySelector('.setup-similar-list');

  // Принимает массив объектов wizard.
  // Создает копию разметки из шаблона similarWizardTemplate. Определяет текстовое содержимое и
  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;
    return wizardElement;
  };

  window.render = function (data) {
    var takeNumber = data.length > 4 ? 4 : data.length;
    similarList.innerHTML = '';
    for (var i = 0; i < takeNumber; i++) {
      similarList.appendChild(renderWizard(data[i]));
    }
    similar.classList.remove('hidden');
  };

})();
