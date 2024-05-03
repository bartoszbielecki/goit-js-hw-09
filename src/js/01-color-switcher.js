document.addEventListener('DOMContentLoaded', function () {
  function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }

  const startButton = document.querySelector('[data-start]');
  const stopButton = document.querySelector('[data-stop]');

  if (startButton && stopButton) {
    let intervalId;

    startButton.addEventListener('click', function () {
      intervalId = setInterval(function () {
        document.body.style.backgroundColor = getRandomHexColor();
      }, 1000);

      this.disabled = true;
      stopButton.disabled = false;
    });

    stopButton.addEventListener('click', function () {
      clearInterval(intervalId);
      startButton.disabled = false;
      this.disabled = true;
    });
  } else {
    console.error('One or both buttons not found.');
  }
});
