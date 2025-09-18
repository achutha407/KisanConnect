async function getWeather() {
  const city = document.getElementById("cityInput").value.tri;
  if (!city) return alert("Enter a city name!");

  const apiKey = "0ec5f00e0d070d2b3008e4b9bce62119"; // OpenWeatherMap key
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("City not found");
    const data = await response.json();

    document.getElementById("cityName").textContent = data.name;
    document.getElementById("condition").textContent = data.weather[0].description;
    document.getElementById("temperature").textContent = data.main.temp;
    document.getElementById("humidity").textContent = data.main.humidity;
    document.getElementById("wind").textContent = data.wind.speed;

    document.getElementById("weatherCard").classList.remove("hidden");

} catch (err) {
  console.error("Error details:", err);
  alert("Something went wrong! Check console for details.");
}
}