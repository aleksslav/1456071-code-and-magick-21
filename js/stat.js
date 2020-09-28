'use strict';

const CLOUD_WIDTH = 420;
const CLOUD_HEIGHT = 270;
const CLOUD_X = 100;
const CLOUD_Y = 10;
const GAP = 10;
const FONT_GAP = 80;
const TEXT_HEIGHT = 10;
const HIST_HEIGHT = 150;
const BAR_WIDTH = 40;
const BAR_GAP = 50;
const BAR_HEIGHT = HIST_HEIGHT - TEXT_HEIGHT;
const PLAYER_NAME = `Вы`;

const renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

const getMaxElement = function (arr) {
  let maxElement = arr[0];

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

const getUserIndex = function (arr) {
  let user;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === PLAYER_NAME) {
      user = i;
      break;
    }
  }

  return user;
};

const renderBar = function (ctx, times, players, barColor, maxTime, i, x) {
  ctx.fillStyle = `#000`;
  ctx.fillText(
      Math.round(times[i]).toString(),
      x,
      CLOUD_Y + FONT_GAP + (BAR_HEIGHT - ((BAR_HEIGHT * times[i]) / maxTime))
  );

  ctx.fillStyle = barColor;
  ctx.fillRect(
      x,
      CLOUD_Y + FONT_GAP + GAP + (BAR_HEIGHT - ((BAR_HEIGHT * times[i]) / maxTime)),
      BAR_WIDTH,
      (BAR_HEIGHT * times[i]) / maxTime
  );

  ctx.fillStyle = `#000`;
  ctx.fillText(
      players[i],
      x,
      CLOUD_Y + BAR_HEIGHT + FONT_GAP + GAP * 3
  );
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(
      ctx,
      CLOUD_X + GAP,
      CLOUD_Y + GAP,
      `rgba(0, 0, 0, 0.7)`
  );
  renderCloud(
      ctx,
      CLOUD_X,
      CLOUD_Y,
      `#fff`
  );

  ctx.fillStyle = `#000`;
  ctx.font = `16px PT Mono`;

  ctx.fillText(
      `Ура вы победили!`,
      CLOUD_X + GAP * 2,
      CLOUD_Y + GAP * 3
  );

  ctx.fillText(
      `Список результатов:`,
      CLOUD_X + GAP * 2,
      CLOUD_Y + GAP * 5
  );

  const maxTime = getMaxElement(times);
  const userIndex = getUserIndex(players);

  renderBar(
      ctx,
      times,
      players,
      `#ff0000`,
      maxTime,
      userIndex,
      CLOUD_X + BAR_GAP - GAP
  );

  times.splice(userIndex, 1);
  players.splice(userIndex, 1);

  for (let i = 0; i < players.length; i++) {
    renderBar(
        ctx,
        times,
        players,
        `hsl(240, 100%,` + Math.random() * 100 + `%)`,
        maxTime,
        i,
        CLOUD_X + BAR_GAP + (BAR_GAP + BAR_WIDTH) * (i + 1) - GAP
    );
  }
};
