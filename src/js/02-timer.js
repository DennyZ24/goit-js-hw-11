import Swal from 'sweetalert2';
import '../sass/main.scss';
import '../sass/timer.scss';


const dataInputEl = document.querySelector('#date-selector');
const daysValueEl = document.querySelector('[data-days]');
const hoursValueEl = document.querySelector('[data-hours]');
const minutesValueEl = document.querySelector('[data-minutes]');
const secondsValueEl = document.querySelector('[data-seconds]');
const startBtnEl = document.querySelector('[data-start]')


dataInputEl.addEventListener('blur', onInputBlur)
startBtnEl.addEventListener('click', onStartBtnClick)

let chooseData = '';
let isTimerActiv = false;
let intervalId = null;

function onInputBlur() {
  chooseData = dataInputEl.valueAsDate;
  
  if (chooseData === null) {
    return
  }
  const currentDate = Date.now();
  
  if (Date.parse(chooseData) < currentDate) {   
    setTimeout(() => {
      Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Please choose a date in the future',
    })
    }, 500);
  }
  else { startBtnEl.removeAttribute('disabled') }

  
  
}

function onStartBtnClick() {
  startTimer();
}

function startTimer() {
  if (isTimerActiv) {
    return
  }
  
  isTimerActiv = true;

  intervalId = setInterval(() => {
    const currentTime = Date.now();
    const deltaTime = Date.parse(chooseData) + (chooseData.getTimezoneOffset() * 60 * 1000) - currentTime;
    const convertedDeltatime = convertMs(deltaTime);
    
    changeTimerMurkup(convertedDeltatime);

    const isZeroDays = daysValueEl.textContent === '00';
    const isZeroHours = hoursValueEl.textContent === '00';
    const isZeroMinutes = minutesValueEl.textContent === '00';
    const isZeroSeconds = secondsValueEl.textContent === '00';
    
    if (isZeroDays && isZeroHours && isZeroMinutes && isZeroSeconds) {
      stopTimer();
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(intervalId)
}

function pad(value) {
  return String(value).padStart(2, '0');
}

function changeTimerMurkup(timeLeft) {
  const { days, hours, minutes, seconds } = timeLeft;
  daysValueEl.textContent = pad(days);
  hoursValueEl.textContent = pad(hours);
  minutesValueEl.textContent = pad(minutes);
  secondsValueEl.textContent = pad(seconds);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

