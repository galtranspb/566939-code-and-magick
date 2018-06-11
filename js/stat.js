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

// Определяет максимальное значение в массиве. Принимает массив данных.
var getMaxElement = function (arr) {
  if (!arr) {
    return arr;
  }
  var maxElement = arr[0];
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
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

  // Генирирует случайное чилсло от 0 до 90
  var saturation = function () {
    return Math.random() * 100;
  };

  // Определяет начальнуюю координату по х столбиков гистограммыб в зависимости от номера элемента массива.
  // Принимает порядковый номер элемента массива.
  var initialCoordinateX = function (index) {
    return CLOUD_X + GAP + (BAR_WIDTH + GAP) * index;
  };

  if (times.length !== names.length) {
    if (names.length > times.length) {
      names.length = times.length;
    } else {
      times.length = names.length;
    }
  }

  for (var i = 0; i < times.length; i++) {
    ctx.fillStyle = (names[i] === 'Вы') ? 'rgba(255, 0, 0, 1)' : 'hsl(240, ' + saturation() + '%, 50%)';
    ctx.fillText(Math.round(times[i]), initialCoordinateX(i), HISTOGRAMM_Y_0 - HISTOGRAMM_MAX_HEIGHT - FONT_GAP);
    ctx.fillRect(initialCoordinateX(i), HISTOGRAMM_Y_0, BAR_WIDTH, ((HISTOGRAMM_MAX_HEIGHT * times[i]) / maxTime) * -1);
    ctx.textBaseline = 'hanging';
    ctx.fillText(names[i], initialCoordinateX(i), HISTOGRAMM_Y_0 + FONT_GAP);
  }
};
