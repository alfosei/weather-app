// API Base URL and Key
const apiKey = "98d7d8d54a68301d47b4481cd451531d";
const baseUrl = "https://api.openweathermap.org/data/2.5/weather";

// Fetch Weather Data
async function getWeather(city){
    try {
        //Show the spinner
        document.getElementById("loading-spinner").style.display = "block";

        //Construct the full API URL
        const url = `${baseUrl}?q=${city}&appid=${apiKey}&units=metric`;

        //Fetch the data from the API
        const response = await fetch(url);

        //Handle errors (such as invalid city)
        if(!response.ok){
            throw new Error("City not found!");
        }

        //Parse the response to JSON
        const data =  await response.json();
        document.getElementById("loading-spinner").style.display = "none";
        return data;
    } catch (error){
        console.error("Error fetching weather data", error);
        alert(error.message);
        document.getElementById("loading-spinner").style.display = "none";
    }

}

// Get References to DOM elements
const searchButton = document.getElementById("search-button");
const cityInput = document.getElementById("city-input");

// Update Weather Info in the UI
function updateWeatherUI(data){
    document.getElementById("city-name").textContent = data.name;
    document.getElementById("temperature").textContent = `Temperature: ${data.main.temp} °C`;
    document.getElementById("condition").textContent = `Condition: ${data.weather[0].description}`;

    // Add icon to the UI
    const iconCode = data.weather[0].icon; // Get icon code
    const iconUrl = `http://openweathermap.org/img/wn/${iconCode}.png`;
    document.getElementById("weather-icon").src = iconUrl;

    //Change background color based on weather condition
    const condition = data.weather[0].main.toLowerCase();
    if(condition === "clear"){
        document.body.style.backgroundColor = "#87CEEB";
    } else if (condition === "clouds"){
        document.body.style.backgroundColor = "#B0C4DE";
    } else if (condition === "rain"){
        document.body.style.backgroundColor = "#4682B4";
    } else {
        document.body.style.backgroundColor = "#f2e5d7";
    }
}

// Add Event Listeners to Search Button
searchButton.addEventListener("click", async ()=>{
    const city = cityInput.value.trim();
    if (city){
        const weatherData = await getWeather(city);
        if (weatherData) {
            updateWeatherUI(weatherData);
        }
    } else {
        alert("Please enter a city name");
    }
});
