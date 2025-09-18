// Dark/Light mode toggle
const toggleBtn = document.querySelector(".toggle-mode");
const body = document.body;

toggleBtn.addEventListener("click", () => {
  body.classList.toggle("light-mode");
  toggleBtn.textContent = body.classList.contains("light-mode") ? "☀️" : "🌙";
});

// Scroll to dashboard
function scrollToDashboard() {
  document.getElementById("dashboard")?.scrollIntoView({ behavior: "smooth" });
}
const headingText = "KisanConnect";
const typedHeading = document.getElementById("typed-heading");
let i = 0;

function typeHeading() {
  if (i < headingText.length) {
    typedHeading.innerHTML = typedHeading.innerHTML.replace("_","") + headingText[i] + "<span id='cursor'>_</span>";
    i++;
    setTimeout(typeHeading, 150); // typing speed
  }
}

typeHeading();
// Simulate data
const soilValue = document.getElementById("soilValue");
const tempValue = document.getElementById("tempValue");
const humidityValue = document.getElementById("humidityValue");

function updateValues() {
  const soil = Math.floor(Math.random() * 100);
  const temp = Math.floor(Math.random() * 15 + 20);
  const humidity = Math.floor(Math.random() * 40 + 40);

  soilValue.textContent = soil + "%";
  tempValue.textContent = temp + "°C";
  humidityValue.textContent = humidity + "%";

  requestAnimationFrame(updateValues);
}

updateValues();
