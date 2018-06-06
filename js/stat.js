'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var FONT_GAP = 10;
var GAP = 50;
var BAR_WIDTH = 40;
var HISTOGRAMM_MAX_HEIGHT = 150;
var HISTOGRAMM_Y_0 = 245;

// Рисует прямоугольник. Принимает 'контекст отрисовки' - ctx, начальные координаты по горизонтали и вертикали, цвет.
var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

// Выравнивает внутренний контейнер относительно внешнего. Принимает размер внешнего контейнера, отступ,
// размер внутреннего контейнера. Размеры должны быть соосны: оба по горизонтали или оба по вертикали.
// Предпологал выровнять по горизонтали гистограмму относительно облака.
// var getAlignment = function (externalContainer, spacing, internalContainer) {
//   return (externalContainer - 2 * spacing - internalContainer) / 2;
// };

// Определяет ширину гистограммы. Принимает массив.
// var getHistogrammWidth = function (arr) {
//   if (arr) {
//     return BAR_WIDTH + (GAP + BAR_WIDTH) * (arr.length - 1);
//   }
// };

// Это значение пробовал подставить вместо координаты по X в ctx.fillText и ctx.fillRect
// // getAlignment(CLOUD_WIDTH, GAP, getHistorgammWidth(names))
// или так
// CLOUD_X + getAlignment(CLOUD_WIDTH, GAP, getHistorgammWidth(names))
// пока не разобрался.

// Определяет максимальное значение в массиве. Принимает массив данных.
var getMaxElement = function (arr) {
  if (arr) {
    var maxElement = arr[0];
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] > maxElement) {
        maxElement = arr[i];
      }
    }
    return maxElement;
  }
  // Ошибку тревис выдаёт. if (arr) - если массив есть, то выполнить код, а если нет, что я должен вернуть?
};

// При выигрыше появляется облако со статистикой.
// Принимает 'контекст отрисовки', массив имён игроков, массив очков игроков.
window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + FONT_GAP, CLOUD_Y + FONT_GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.font = '16px PT Mono';
  ctx.fillStyle = '#000';
  ctx.fillText('Ура вы победили!', 230, 30);
  ctx.fillText('Список результатов:', 230, 50);

  var maxTime = getMaxElement(times);

  // var randomColor = function () {
  //   return hsl(240, Math.random() * 100, 50%); Тут надо указывать '* 100%'?
  // };

  for (var i = 0; i < times.length; i++) {
    if (i < 1) {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = 'hsl(240, 100%, 50%)';
    // ctx.fillStyle = randomColor();
    // Не понял, как передать не строку в свойство fillStyle. Надо сгенерировать случайный цвет,
    // перевести его в строку методом toString() и потом уже подставлять?
    }
    ctx.fillText(Math.round(times[i]), CLOUD_X + GAP + (BAR_WIDTH + GAP) * i, HISTOGRAMM_Y_0 - HISTOGRAMM_MAX_HEIGHT - FONT_GAP);
    ctx.fillRect(CLOUD_X + GAP + (BAR_WIDTH + GAP) * i, HISTOGRAMM_Y_0, BAR_WIDTH, ((HISTOGRAMM_MAX_HEIGHT * times[i]) / maxTime) * -1);
  }

  for (i = 0; i < names.length; i++) {
    ctx.textBaseline = 'hanging';
    ctx.fillText(names[i], CLOUD_X + GAP + (BAR_WIDTH + GAP) * i, HISTOGRAMM_Y_0 + FONT_GAP);
  }
};
