"use strict";

const CARROT_SIZE = 80;
const BUG_SIZE = 50;
const CARROT_COUNT = 10;
const BUG_COUNT = 10;
const GAME_DURATION_SEC = 10;

const gameField = document.querySelector(".gameField");
const fieldRect = gameField.getBoundingClientRect();
const gameBtn = document.querySelector(".gameButton");
const gameTimer = document.querySelector(".gameTimer");
const gameScore = document.querySelector(".gameScore");

const popup = document.querySelector(".popup");
const popupMessage = document.querySelector(".popupMessage");
const popupReplay = document.querySelector(".popupReplay");

const carrotSound = new Audio("./sound/carrot_pull.mp3");
const alertSound = new Audio("./sound/alert.wav");
const bgSound = new Audio("./sound/bg.mp3");
const bugSound = new Audio("./sound/bug_pull.mp3");
const winSound = new Audio("./sound/game_win.mp3");

let started = false;
let score = 0;
let timer = undefined;

gameField.addEventListener("click", onFieldClick);

gameBtn.addEventListener("click", () => {
  if (started) {
    stopGame();
  } else {
    startGame();
  }
});

popupReplay.addEventListener("click", () => {
  startGame();
  hidePopup();
});

function startGame() {
  started = true;
  initGame();
  showStopButton();
  showTimerAndScore();
  startGameTimer(10);
  playSound(bgSound);
}

function stopGame() {
  started = false;
  clearInterval(timer);
  hideGameButton();
  showPopupWithText("Replay❓");
  playSound(alertSound);
  stopSound(bgSound);
}

function finishGame(win) {
  started = false;
  hideGameButton();
  if (win) {
    playSound(winSound);
  } else {
    playSound(bugSound);
  }
  stopGameTimer();
  stopSound(bgSound);
  showPopupWithText(win ? "YOU WON 🎉" : "YOU LOST 💩");
}

function showStopButton() {
  const icon = document.querySelector(".fas");
  icon.classList.add("fa-stop");
  icon.classList.remove("fa-play");
  gameBtn.style.visibility = "visible";
}

function hideGameButton() {
  gameBtn.style.visibility = "hidden";
}

function showTimerAndScore() {
  gameTimer.style.visibility = "visible";
  gameScore.style.visibility = "visible";
}

function startGameTimer() {
  let remainingTimeSec = GAME_DURATION_SEC;
  updateTimerText(remainingTimeSec);
  timer = setInterval(() => {
    if (remainingTimeSec <= 0) {
      clearInterval(timer);
      finishGame(CARROT_COUNT === score);
      return;
    }
    updateTimerText(--remainingTimeSec);
  }, 1000);
}

function stopGameTimer() {
  clearInterval(timer);
  hideGameButton();
  showPopupWithText("Replay❓");
}

function updateTimerText(time) {
  gameTimer.textContent = time;
}

function showPopupWithText(text) {
  popupMessage.innerText = text;
  popup.style.display = "flex";
}

function hidePopup() {
  popup.style.display = "none";
}

function initGame() {
  score = 0;
  gameField.innerHTML = "";
  gameScore.textContent = CARROT_COUNT;
  addItem("carrot", CARROT_COUNT, "img/carrot.png", CARROT_SIZE);
  addItem("bug", BUG_COUNT, "img/bug.png", BUG_SIZE);
}

function onFieldClick(event) {
  if (!started) {
    return;
  }
  const target = event.target;
  if (target.matches(".carrot")) {
    target.remove();
    score++;
    playSound(carrotSound);
    updateScoreBoard();
    if (score === CARROT_COUNT) {
      finishGame(true);
    }
  } else if (target.matches(".bug")) {
    finishGame(false);
  }
}

function playSound(sound) {
  sound.currentTime = 0;
  sound.play();
}

function stopSound(sound) {
  sound.pause();
}

function updateScoreBoard() {
  gameScore.innerText = CARROT_COUNT - score;
}

function addItem(className, count, imgPath, itemSize) {
  const x1 = 0;
  const y1 = 0;
  const x2 = fieldRect.width - itemSize;
  const y2 = fieldRect.height - itemSize;

  for (let i = 0; i < count; i++) {
    const carrotImg = document.createElement("img");
    carrotImg.setAttribute("src", imgPath);
    carrotImg.setAttribute("alt", "carrot");
    carrotImg.setAttribute("class", className);
    carrotImg.setAttribute("id", `carrot${i}`);
    const x = randomNumber(x1, x2);
    const y = randomNumber(y1, y2);
    carrotImg.style.transform = `translate(${x}px, ${y}px)`;
    gameField.appendChild(carrotImg);
  }
}

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}
