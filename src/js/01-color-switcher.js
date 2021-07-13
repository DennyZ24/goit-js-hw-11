const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');

startBtn.addEventListener('click', onStartBtnClick);
stopBtn.addEventListener('click', onStopBtnClick);

let isChangeThemeActiv = false;
let intervalId = '';

function onStartBtnClick(evt) {
  if (isChangeThemeActiv) {
    return
  }
  
  startBtn.setAttribute('disabled', true);

  intervalId = setInterval(() => {
    isChangeThemeActiv = true
    const hexColor = getRandomHexColor();
    document.body.style.backgroundColor = hexColor;
  }, 1000);
};

function onStopBtnClick() {
  clearInterval(intervalId);
  isChangeThemeActiv = false;
  startBtn.removeAttribute('disabled');
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};