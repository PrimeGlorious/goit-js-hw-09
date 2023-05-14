function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
};

const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');

let intervalId = null;

startBtn.addEventListener('click', onStartBtnClick);
stopBtn.addEventListener('click', onStopBtnClick);

function onStartBtnClick() {
  intervalId = setInterval(() => {
    const randomColor = getRandomHexColor();
    document.body.style.backgroundColor = randomColor;
  }, 1000);

  startBtn.disabled = true;
  stopBtn.disabled = false;
};

function onStopBtnClick() {
  clearInterval(intervalId);

  startBtn.disabled = false;
  stopBtn.disabled = true;
};