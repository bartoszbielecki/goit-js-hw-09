import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const currentDate = new Date();

    if (selectedDate <= currentDate) {
      Notiflix.Report.failure(
        'Error',
        'Please choose a date in the future',
        'OK'
      );
      return;
    }

    const startButton = document.querySelector('[data-start]');
    startButton.disabled = false;
  },
};

flatpickr('#datetime-picker', options);

const countdownTimer = () => {
  const startButton = document.querySelector('[data-start]');
  const daysElement = document.querySelector('[data-days]');
  const hoursElement = document.querySelector('[data-hours]');
  const minutesElement = document.querySelector('[data-minutes]');
  const secondsElement = document.querySelector('[data-seconds]');

  let countdownInterval;

  startButton.addEventListener('click', () => {
    const selectedDate = flatpickr.parseDate(
      document.querySelector('#datetime-picker').value,
      'Y-m-d H:i'
    );
    const currentDate = new Date();
    let difference = selectedDate - currentDate;

    if (difference <= 0) {
      Notiflix.Report.failure(
        'Error',
        'Please choose a date in the future',
        'OK'
      );
      return;
    }

    startButton.disabled = true;

    const updateCounter = () => {
      const { days, hours, minutes, seconds } = convertMs(difference);

      daysElement.textContent = addLeadingZero(days);
      hoursElement.textContent = addLeadingZero(hours);
      minutesElement.textContent = addLeadingZero(minutes);
      secondsElement.textContent = addLeadingZero(seconds);

      if (difference <= 0) {
        clearInterval(countdownInterval);
        Notiflix.Report.Success('Success', 'Countdown finished!', 'OK');
      }

      difference -= 1000;
    };

    updateCounter();
    countdownInterval = setInterval(updateCounter, 1000);
  });
};

const convertMs = ms => {
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

const addLeadingZero = value => {
  return value < 10 ? '0' + value : value;
};

countdownTimer();
