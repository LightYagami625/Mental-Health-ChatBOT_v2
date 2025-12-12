// Daily rotating wellness tips
const tips = [
  "Take a deep breath — you're stronger than you think.",
  "A 2-minute break can reset your whole mindset.",
  "Progress is progress, no matter how small.",
  "Be kind to yourself today — you deserve it.",
  "Your emotions are valid. It's okay to feel them.",
];

const tipBox = document.getElementById("tip-text");

// show a random wellness tip
function loadTip() {
  const random = Math.floor(Math.random() * tips.length);
  tipBox.textContent = tips[random];
}

loadTip();

// Refresh tip every page refresh
