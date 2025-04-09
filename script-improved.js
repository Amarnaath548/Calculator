
function updateGlowingClock() {
  const now = new Date();

  let hours = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';

  hours = hours % 12 || 12;
  hours = String(hours).padStart(2, '0');

  const clock = document.getElementById('glow-clock');
  const date = document.getElementById('glow-date');
  if (clock) clock.textContent = `${hours}:${minutes}:${seconds} ${ampm}`;

  const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
  const dateString = now.toLocaleDateString(undefined, options);
  if (date) date.textContent = dateString;
}

updateGlowingClock();
setInterval(updateGlowingClock, 1000);

const clickSound = document.getElementById('click-sound');
const errorSound = document.getElementById('error-sound');

function appendValue(value) {
  if (clickSound) clickSound.play();
  const display = document.getElementById('display');
  if (display) display.value += value;
}

function clearDisplay() {
  if (clickSound) clickSound.play();
  const display = document.getElementById('display');
  if (display) display.value = "";
}

function backspace() {
  if (clickSound) clickSound.play();
  const display = document.getElementById('display');
  if (display) display.value = display.value.slice(0, -1);
}

function calculate() {
  const display = document.getElementById('display');
  if (!display) return;
  const expression = display.value;

  if (/^[0-9+\-*/(). ]+$/.test(expression)) {
    try {
      display.value = Function('"use strict"; return (' + expression + ')')();
    } catch {
      if (errorSound) errorSound.play();
      display.value = "Error";
    }
  } else {
    if (errorSound) errorSound.play();
    display.value = "Invalid";
  }
}

document.addEventListener('keydown', function(event) {
  const key = event.key;
  const validKeys = '0123456789+-*/().';

  if (validKeys.includes(key)) {
    appendValue(key);
  } else if (key === 'Enter') {
    calculate();
  } else if (key === 'Backspace') {
    backspace();
  } else if (key === 'Escape') {
    clearDisplay();
  }
});

document.getElementById('display')?.addEventListener('input', function (e) {
  this.value = this.value.replace(/[^0-9+\-*/().]/g, '');
});
