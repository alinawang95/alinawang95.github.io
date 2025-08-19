function openProfile(name) {
  document.getElementById('popup-' + name).style.display = 'block';
  updateCircleValues();
}

function closeProfile(name) {
  document.getElementById('popup-' + name).style.display = 'none';
}

function updateCircleValues() {
  document.querySelectorAll('.circle, .mini-circle').forEach(el => {
    const score = parseFloat(el.dataset.score);
    el.style.setProperty('--score', score);
    el.textContent = score;
  });
}

