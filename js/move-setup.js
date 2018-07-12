'use strict';

(function () {

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
    var onDocumentMousemove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      // Принимает коорд маркера, мыши, мин и макс значание интервала.
      // Если курсор мыши выходит за указанный интервал, то возвращает 0 (т.е. перемещение = 0)
      var shift = {
        x: 0,
        y: 0
      };

      if (moveEvt.pageX < 50 || moveEvt.pageX + window.utility.setup.offsetWidth > 1300) {
        shift.x = 0;
      } else {
        shift.x = startCoords.x - moveEvt.clientX;
      }

      if (moveEvt.pageY < 20 || moveEvt.pageY + window.utility.setup.offsetHeight > 1000) {
        shift.y = 0;
      } else {
        shift.y = startCoords.y - moveEvt.clientY;
      }

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      window.utility.setup.style.top = (window.utility.setup.offsetTop - shift.y) + 'px';
      window.utility.setup.style.left = (window.utility.setup.offsetLeft - shift.x) + 'px';
    };

    // Обработчик события mouseup. Отменяет действие по умолчанию. Снимает обработчики mousemove, mouseup.
    // Если есть перемещение курсора, то вешает обработчик клика onSetupUserPicClick на элемент dialog.
    var onDocumentMouseup = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onDocumentMousemove);
      document.removeEventListener('mouseup', onDocumentMouseup);

      if (dragged) {
        // Обработчик события клика по элементу .setup-user-pic
        // Отменяет действие по умолчанию - открытие окна загрузки файла. Убирает обработчик клика по элементу dialog.
        var onSetupUserPicClick = function (clickEvt) {
          clickEvt.preventDefault();
          window.utility.dialog.removeEventListener('click', onSetupUserPicClick);
        };
        window.utility.dialog.addEventListener('click', onSetupUserPicClick);
      }
    };

    document.addEventListener('mousemove', onDocumentMousemove);
    document.addEventListener('mouseup', onDocumentMouseup);
  };

  window.utility.dialog.addEventListener('mousedown', onDialogMousedown);

})();
