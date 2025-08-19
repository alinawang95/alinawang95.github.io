function showMessage(text) {
  const msg = document.getElementById("scrolling-message");
  if (!msg) return;

  msg.innerText = text;

  msg.classList.remove("scrolling");
  void msg.offsetWidth; 
  msg.classList.add("scrolling");

  const audio = document.getElementById("ping");
  if (audio) {
    audio.currentTime = 0; 
    audio.play().catch(e => {
      console.warn(e);
    });
  }
}

function toggleChipInfo() {
  const info = document.getElementById("chip-info-text");
  if (info.style.display === "block") {
    info.style.display = "none";
  } else {
    info.style.display = "block";
  }
}

