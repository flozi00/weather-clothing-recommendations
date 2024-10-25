document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app');

    // Use the Geolocation API to fetch the user's location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(fetchWeatherData, showError);
    } else {
        app.innerHTML = "Geolocation is not supported by this browser.";
    }

    function fetchWeatherData(position) {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        // Fetch weather data from the Open-Meteo API using the user's location
        const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,daylight_duration,precipitation_sum`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                displayWeatherData(data);
                displayClothingRecommendations(data);
            })
            .catch(error => {
                app.innerHTML = "Error fetching weather data.";
                console.error(error);
            });
    }

    function showError(error) {
        switch (error.code) {
            case error.PERMISSION_DENIED:
                app.innerHTML = "User denied the request for Geolocation.";
                break;
            case error.POSITION_UNAVAILABLE:
                app.innerHTML = "Location information is unavailable.";
                break;
            case error.TIMEOUT:
                app.innerHTML = "The request to get user location timed out.";
                break;
            case error.UNKNOWN_ERROR:
                app.innerHTML = "An unknown error occurred.";
                break;
        }
    }

    function displayWeatherData(data) {
        const weatherDiv = document.createElement('div');
        weatherDiv.className = 'weather';
        const weatherIcons = {
            0: '☀️', // Clear sky
            1: '🌤️', // Mainly clear
            2: '⛅', // Partly cloudy
            3: '☁️', // Overcast
            45: '🌫️', // Fog
            48: '🌫️', // Depositing rime fog
            51: '🌦️', // Drizzle: Light
            53: '🌦️', // Drizzle: Moderate
            55: '🌦️', // Drizzle: Dense intensity
            56: '🌧️', // Freezing Drizzle: Light
            57: '🌧️', // Freezing Drizzle: Dense intensity
            61: '🌧️', // Rain: Slight
            63: '🌧️', // Rain: Moderate
            65: '🌧️', // Rain: Heavy intensity
            66: '🌨️', // Freezing Rain: Light
            67: '🌨️', // Freezing Rain: Heavy intensity
            71: '❄️', // Snow fall: Slight
            73: '❄️', // Snow fall: Moderate
            75: '❄️', // Snow fall: Heavy intensity
            77: '❄️', // Snow grains
            80: '🌧️', // Rain showers: Slight
            81: '🌧️', // Rain showers: Moderate
            82: '🌧️', // Rain showers: Violent
            85: '❄️', // Snow showers slight
            86: '❄️', // Snow showers heavy
            95: '⛈️', // Thunderstorm: Slight or moderate
            96: '⛈️', // Thunderstorm with slight hail
            99: '⛈️'  // Thunderstorm with heavy hail
        };
        const weatherIcon = weatherIcons[data.current_weather.weathercode] || '❓';
        weatherDiv.innerHTML = `
            <h2>Wetter an Ihrem Standort</h2>
            <p>Temperatur: ${data.current_weather.temperature}°C</p>
            <p>Wetter: ${weatherIcon}</p>
        `;
        app.appendChild(weatherDiv);
    }

    function displayClothingRecommendations(data) {
        const recommendationsDiv = document.createElement('div');
        recommendationsDiv.className = 'recommendations';
        const temp = data.current_weather.temperature;
        const windSpeed = data.current_weather.windspeed;
        const weatherCode = data.current_weather.weathercode;

        let recommendations = '';

        // Layer 1: Unterwäsche
        if (temp < 5) {
            recommendations += 'Schicht 1: Thermo-Unterwäsche, Thermo-Socken. ';
        } else {
            recommendations += 'Schicht 1: Normale Unterwäsche, Socken. ';
        }

        // Layer 2: Alltagswäsche
        if (temp < 10) {
            recommendations += 'Schicht 2: Langärmliges Shirt, Pullover, lange Hose. ';
        } else if (temp >= 10 && temp < 20) {
            recommendations += 'Schicht 2: Kurzärmliges Shirt, leichte Jacke, lange Hose. ';
        } else {
            recommendations += 'Schicht 2: T-Shirt, Shorts oder Rock/Kleid. ';
        }

        // Layer 3: Außenkleidung
        if (temp < 10) {
            recommendations += 'Schicht 3: Winterjacke, Winterschuhe, Schal, Handschuhe, Mütze. ';
        } else if (temp >= 10 && temp < 20) {
            recommendations += 'Schicht 3: Leichte Jacke, Sportschuhe. ';
        } else {
            recommendations += 'Schicht 3: Keine Jacke, Sandalen. ';
        }

        if (windSpeed > 20) {
            recommendations += 'Es ist windig, ziehen Sie winddichte Kleidung in Betracht. ';
        }

        if (weatherCode >= 51 && weatherCode <= 67) {
            recommendations += 'Es regnet, tragen Sie wasserdichte Kleidung und nehmen Sie einen Regenschirm mit. ';
        } else if (weatherCode >= 71 && weatherCode <= 77) {
            recommendations += 'Es schneit, tragen Sie warme und wasserdichte Kleidung. ';
        }

        recommendationsDiv.innerHTML = `
            <h2>Kleidungsempfehlungen</h2>
            <p>${recommendations}</p>
        `;
        app.appendChild(recommendationsDiv);
    }
});
