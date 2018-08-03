'use strict';

(function () {

  var setup = window.setup.setup;
  var dialog = document.querySelector('.setup-user-pic');
  var LimitMovement = {
    horizontally: {
      left: 50,
      right: 1300
    },
    vertically: {
      top: 20,
      bottom: 1000
    }
  };

  // Обработчик события mousedown.
  // Отменяет действие по умолчанию, указывает стартовые координаты,
  // добалвяет на document обработчики onMouseMove и onMouseUp.
  var onDialogMousedown = function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };
    var dragged = false;

    // Принимает событие mousemove.
    // Определяет перемещение мыши по Х/У и устанавливает их
    // в свойство стиля соответственно left/top элемента setup.
    var onDocumentMousemove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = {
        x: 0,
        y: 0
      };

      if (moveEvt.pageX < LimitMovement.horizontally.left ||
        moveEvt.pageX + setup.offsetWidth > LimitMovement.horizontally.right) {
        shift.x = 0;
      } else {
        shift.x = startCoords.x - moveEvt.clientX;
      }

      if (moveEvt.pageY < LimitMovement.vertically.top ||
        moveEvt.pageY + setup.offsetHeight > LimitMovement.vertically.bottom) {
        shift.y = 0;
      } else {
        shift.y = startCoords.y - moveEvt.clientY;
      }

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      setup.style.top = (setup.offsetTop - shift.y) + 'px';
      setup.style.left = (setup.offsetLeft - shift.x) + 'px';
    };

    // Обработчик события mouseup. Отменяет действие по умолчанию. Снимает обработчики mousemove, mouseup.
    // Если есть перемещение курсора, то вешает обработчик клика onSetupUserPicClick на элемент dialog.
    var onDocumentMouseup = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onDocumentMousemove);
      document.removeEventListener('mouseup', onDocumentMouseup);

      if (dragged) {
        var onSetupUserPicClick = function (clickEvt) {
          clickEvt.preventDefault();
          dialog.removeEventListener('click', onSetupUserPicClick);
        };
        dialog.addEventListener('click', onSetupUserPicClick);
      }
    };

    document.addEventListener('mousemove', onDocumentMousemove);
    document.addEventListener('mouseup', onDocumentMouseup);
  };

  dialog.addEventListener('mousedown', onDialogMousedown);

  window.setupMove = {
    dialog: dialog
  };

})();
