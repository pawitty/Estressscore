const weights = {
  aq: 0.25,
  temp: 0.20,
  humidity: 0.10,
  sound: 0.30,
  consensus: 0.15
};

const inputs = ["aq", "temp", "humidity", "sound", "consensus"];

function getValue(id) {
  return parseFloat(document.getElementById(id).value);
}

function calculateStress() {
  let score = 0;

  inputs.forEach(i => {
    score += weights[i] * getValue(i);
  });

  score = Math.min(Math.max(score, 0), 1); // clamp

  updateUI(score);
}

function updateUI(score) {
  const scoreEl = document.getElementById("scoreValue");
  const statusEl = document.getElementById("status");
  const actionEl = document.getElementById("actionText");

  scoreEl.textContent = score.toFixed(2);

  if (score < 0.4) {
    statusEl.textContent = "NORMAL";
    statusEl.style.color = "lime";
    actionEl.textContent = "All good. Maintain monitoring.";
  }
  else if (score < 0.65) {
    statusEl.textContent = "ELEVATED";
    statusEl.style.color = "yellow";
    actionEl.textContent = "Deploy volunteers, monitor crowd density.";
  }
  else if (score < 0.85) {
    statusEl.textContent = "HIGH";
    statusEl.style.color = "orange";
    actionEl.textContent = "Send water units, control entry flow.";
  }
  else {
    statusEl.textContent = "CRITICAL";
    statusEl.style.color = "red";
    actionEl.textContent = "Emergency response: evacuate + alert authorities.";
  }
}

inputs.forEach(id => {
  document.getElementById(id).addEventListener("input", calculateStress);
});

calculateStress();
