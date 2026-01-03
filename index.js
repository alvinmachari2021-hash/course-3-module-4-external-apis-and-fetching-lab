// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area=";

document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("state-input");
  const button = document.getElementById("fetch-alerts");
  const alertsDisplay = document.getElementById("alerts-display");
  const errorMessage = document.getElementById("error-message");

  button.addEventListener("click", async () => {
    const state = input.value.trim().toUpperCase();

    // Reset displays
    alertsDisplay.innerHTML = "";
    errorMessage.textContent = "";
    errorMessage.classList.add("hidden");

    // Validate input
    if (!state || state.length !== 2) {
      errorMessage.textContent = "❌ Please enter a valid 2-letter state abbreviation.";
      errorMessage.classList.remove("hidden");
      return;
    }

    try {
      const response = await fetch(`${weatherApi}${state}`);

      if (!response.ok) {
        throw new Error(`Network error: ${response.status}`);
      }

      const data = await response.json();

      if (data.features.length === 0) {
        alertsDisplay.textContent = `✅ No active alerts for ${state}.`;
        return;
      }

      // Display alert headlines
      alertsDisplay.innerHTML = `
        <ul>
          ${data.features.map(alert => `<li>${alert.properties.headline}</li>`).join("")}
        </ul>
      `;
    } catch (error) {
      errorMessage.textContent = `⚠️ Error fetching alerts: ${error.message}`;
      errorMessage.classList.remove("hidden");
    }
  });
});