const soilCards = document.querySelectorAll(".soil-card");
const moistureSlider = document.getElementById("moistureLevel");
const moistureValue = document.getElementById("moistureValue");
const suggestionBox = document.getElementById("suggestion");

let selectedSoil = null;

// Update moisture text
moistureSlider.addEventListener("input", () => {
  moistureValue.textContent = `${moistureSlider.value}%`;
  if (selectedSoil) showSuggestion();
});

// Soil selection
soilCards.forEach(card => {
  card.addEventListener("click", () => {
    selectedSoil = card.dataset.soil;
    soilCards.forEach(c => c.classList.remove("active"));
    card.classList.add("active");
    showSuggestion();
  });
});

// Show crop suggestion
function showSuggestion() {
  const moisture = parseInt(moistureSlider.value);

  let crop = "Millets", fertilizer = "Organic Compost";

  if (selectedSoil === "black") {
    crop = moisture > 50 ? "Cotton" : "Jowar";
    fertilizer = "Nitrogen-rich Fertilizer";
  } else if (selectedSoil === "red") {
    crop = moisture > 50 ? "Groundnut" : "Ragi";
    fertilizer = "Phosphate Fertilizer";
  } else if (selectedSoil === "alluvial") {
    crop = moisture > 50 ? "Rice" : "Wheat";
    fertilizer = "Balanced NPK Mix";
  } else if (selectedSoil === "sandy") {
    crop = moisture > 50 ? "Potato" : "Peanuts";
    fertilizer = "Organic Manure";
  } else if (selectedSoil === "clayey") {
    crop = moisture > 50 ? "Sugarcane" : "Paddy";
    fertilizer = "Urea & DAP";
  }

  suggestionBox.innerHTML = `
    <div class="suggestion-card">
      <h2>🌾 Recommended Crop: ${crop}</h2>
      <p><strong>Fertilizer:</strong> ${fertilizer}</p>
      <p><strong>Soil:</strong> ${selectedSoil.toUpperCase()}</p>
      <p><strong>Moisture:</strong> ${moisture}%</p>
    </div>
  `;
}
