'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  var setup = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = setup.querySelector('.setup-close');
  var setupUserName = setup.querySelector('.setup-user-name');
  var preview = document.querySelector('.setup-user-pic');

  // Убирает класс hidden у объекта setup, добавляет обработчик собития keydown на объект документ и
  // устанавливает z-index 3.
  var openPopup = function () {
    setup.classList.remove('hidden');
    setup.querySelector('.setup-similar').classList.remove('hidden');
    window.setupMove.dialog.style.zIndex = 3;
    document.addEventListener('keydown', onPopupEscPress);
  };

  // Добаляет класс hidden объекту setup, убирает обработчик события keydown у объекта document и
  // обнуляет положение окна настройки персонажа.
  var closePopup = function () {
    setup.classList.add('hidden');
    setup.querySelector('.setup-similar').classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
    setup.style.top = '';
    setup.style.left = '';
    preview.src = './img/user-1.jpg';
  };

  // Принимает событие event. Если нажата клавиша ESC и поле ввода имени не в фокусе,
  //  то запускает функцию closePopup.
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

  window.setup = {
    setup: setup
  };

})();
