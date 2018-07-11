'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  var setupOpen = document.querySelector('.setup-open');
  var setupClose = document.querySelector('.setup-close');
  var setupUserName = document.querySelector('.setup-user-name');

  // Убирает класс hidden у объекта setup и добавляет обработчик собития keydown на объект документ.
  var openPopup = function () {
    window.utility.setup.classList.remove('hidden');
    window.utility.setup.querySelector('.setup-similar').classList.remove('hidden');
    window.utility.dialog.style.zIndex = 3;
    document.addEventListener('keydown', onPopupEscPress);
  };

  // Добаляет класс hidden объекту setup и убирает обработчик события keydown у объекта document.
  var closePopup = function () {
    window.utility.setup.classList.add('hidden');
    window.utility.setup.querySelector('.setup-similar').classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
    window.utility.setup.style.top = '';
    window.utility.setup.style.left = '';
  };

  // Принимает событие event. Если нажата клавиша ESC, то запускает функцию closePopup.
  var onPopupEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE && document.activeElement !== setupUserName) {
      closePopup();
    }
  };

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

})();
