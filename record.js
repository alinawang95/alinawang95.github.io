function playBeep(valueName) {
  const audio = document.getElementById("beep");
  if (audio) {
    audio.currentTime = 0;
    audio.play().catch(e => console.warn("Sound play failed:", e));
  }
}

function openPopup(id) {
  document.getElementById(id).style.display = 'block';
}

function closePopup(id) {
  document.getElementById(id).style.display = 'none';
}

// Live clock in sidebar
function updateClock() {
  const clock = document.getElementById("clock");
  const now = new Date();
  clock.textContent = now.toLocaleTimeString();
}
setInterval(updateClock, 1000);
updateClock();
