'use strict';

(function () {
  var coatColor;
  var eyesColor;
  var wizards = [];

  // Принимает объект - волшебник.
  // Определяет ранг волшебника.
  var getRank = function (wizard) {
    var rank = 0;
    if (wizard.colorCoat === coatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === eyesColor) {
      rank += 1;
    }
    return rank;
  };

  // Сортировка в алфавитном порядке.
  var namesComparator = function (left, right) {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  };

  // Сортирует похожих волшебников и обновляет их на странице.
  var updateWizards = function () {
    window.render(wizards.sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = namesComparator(left.name, right.name);
      }
      return rankDiff;
    }));
  };

  window.wizard.onEyesChange = function (color) {
    eyesColor = color;
    updateWizards();
  };

  window.wizard.onCoatChange = function (color) {
    coatColor = color;
    updateWizards();
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

})();
