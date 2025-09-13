function updateGlowingClock() {
  const now = new Date();

  let hours = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  const ampm = hours >= 12 ? 'PM' : 'AM';

  hours = hours % 12;
  hours = hours ? hours : 12;
  hours = String(hours).padStart(2, '0');

  document.getElementById('glow-clock').textContent = `${hours}:${minutes}:${seconds} ${ampm}`;

  const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
  const dateString = now.toLocaleDateString(undefined, options);
  document.getElementById('glow-date').textContent = dateString;
}

updateGlowingClock();
setInterval(updateGlowingClock, 1000);


function appendValue(value) {
 
  document.getElementById('display').value += value;
}

function clearDisplay() {
  
  document.getElementById('display').value = "";
}

function backspace() {
  
  let display = document.getElementById('display');
  display.value = display.value.slice(0, -1);
}

function calculate() {
  try {
    document.getElementById('display').value = 
      Function('"use strict"; return (' + document.getElementById('display').value + ')')();
  } catch {
    errorSound.play();
    document.getElementById('display').value = "Error";
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
document.getElementById('display').addEventListener('input', function(e) {
 
  this.value = this.value.replace(/[^0-9+\-*/().]/g, '');
});
