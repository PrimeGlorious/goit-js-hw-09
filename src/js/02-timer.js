import flatpickr from "flatpickr";
import Notiflix from 'notiflix';
import "flatpickr/dist/flatpickr.min.css";

const startBtnRef = document.querySelector('[data-start]');
let selectedData = null;

const daysField = document.querySelector('[data-days]');
const hoursField = document.querySelector('[data-hours]');
const minutesField = document.querySelector('[data-minutes]');
const secondsField = document.querySelector('[data-seconds]');

startBtnRef.addEventListener('click', startTimer);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    if (selectedDates[0] < Date.now()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      return;
    }
    selectedData = selectedDates[0];
    startBtnRef.disabled = false;
  },
};

flatpickr('#datetime-picker', options);

function startTimer() {
  setInterval(() => {
    const deltaTime = selectedData - Date.now();
    const time = convertMs(deltaTime);
    getVisualTimer(time);
    console.log(time);
  }, 1000);
}

function getVisualTimer({days, hours, minutes, seconds}) {
  daysField.textContent = pad(days);
  hoursField.textContent = pad(hours);
  minutesField.textContent = pad(minutes);
  secondsField.textContent = pad(seconds);
};

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
};

function pad(value) {
  return String(value).padStart(2, '0');
};
