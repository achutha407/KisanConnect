// Value elements
const moistureValue = document.getElementById("moistureValue");
const tempValue = document.getElementById("tempValue");
const humidityValue = document.getElementById("humidityValue");
const field4Value = document.getElementById("field4Value");
const field5Value = document.getElementById("field5Value");

// Chart setup function
function createChart(ctx, label, color) {
  return new Chart(ctx, {
    type: "line",
    data: {
      labels: [],
      datasets: [{
        label: label,
        data: [],
        borderColor: color,
        backgroundColor: color + "33",
        fill: true,
        tension: 0.4
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } },
      scales: {
        x: { display: false },
        y: { beginAtZero: true }
      }
    }
  });
}

// Create charts
const moistureChart = createChart(document.getElementById("moistureChart"), "Moisture", "#00FF00");
const tempChart = createChart(document.getElementById("tempChart"), "Temp", "#FF6600");
const humidityChart = createChart(document.getElementById("humidityChart"), "Humidity", "#0099FF");
const field4Chart = createChart(document.getElementById("field4Chart"), "Field 4", "#FF00FF");
const field5Chart = createChart(document.getElementById("field5Chart"), "Field 5", "#FFFF00");

// Demo Data Generator
function generateRandomDemoData() {
  const time = new Date().toLocaleTimeString();

  const soil = Math.floor(Math.random() * 100);
  const temp = Math.floor(Math.random() * 15 + 20);
  const humidity = Math.floor(Math.random() * 40 + 40);
  const field4 = Math.floor(Math.random() * 50);
  const field5 = Math.floor(Math.random() * 200);

  moistureValue.textContent = soil + "%";
  tempValue.textContent = temp + "°C";
  humidityValue.textContent = humidity + "%";
  field4Value.textContent = field4;
  field5Value.textContent = field5;

  function updateChart(chart, value) {
    chart.data.labels.push(time);
    chart.data.datasets[0].data.push(value);
    if (chart.data.labels.length > 10) {
      chart.data.labels.shift();
      chart.data.datasets[0].data.shift();
    }
    chart.update();
  }

  updateChart(moistureChart, soil);
  updateChart(tempChart, temp);
  updateChart(humidityChart, humidity);
  updateChart(field4Chart, field4);
  updateChart(field5Chart, field5);

  updateLastUpdated();
}

// Run demo every 2 seconds
// Run demo every 3 minutes (180000 ms)
setInterval(generateRandomDemoData, 180000);
generateRandomDemoData(); // initial call


// Clock
function updateClock() {
  const now = new Date();
  document.getElementById("clock").textContent = now.toLocaleTimeString();
}
setInterval(updateClock, 1000);

// Last Updated
function updateLastUpdated() {
  document.getElementById("lastUpdated").textContent = new Date().toLocaleTimeString();
}

// Leaflet Map (demo coordinates)
const map = L.map('map').setView([12.9716, 77.5946], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap'
}).addTo(map);
L.marker([12.9716, 77.5946]).addTo(map).bindPopup("Farm Location").openPopup();

// CSV Download for demo
document.getElementById("downloadBtn").addEventListener("click", () => {
  const rows = [["Time", "Moisture", "Temp", "Humidity", "Field4", "Field5"]];
  for (let i = 0; i < moistureChart.data.labels.length; i++) {
    rows.push([
      moistureChart.data.labels[i],
      moistureChart.data.datasets[0].data[i],
      tempChart.data.datasets[0].data[i],
      humidityChart.data.datasets[0].data[i],
      field4Chart.data.datasets[0].data[i],
      field5Chart.data.datasets[0].data[i]
    ]);
  }

  let csvContent = rows.map(e => e.join(",")).join("\n");
  const blob = new Blob([csvContent], { type: "text/csv" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "farm_data_demo.csv";
  a.click();
});

// Loader
window.addEventListener("load", () => {
  document.getElementById("loader").style.display = "none";
});
