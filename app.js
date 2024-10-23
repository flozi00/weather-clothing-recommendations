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
        const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;

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
        weatherDiv.innerHTML = `
            <h2>Weather in your location</h2>
            <p>Temperature: ${data.current_weather.temperature}°C</p>
            <p>Weather: ${data.current_weather.weathercode}</p>
        `;
        app.appendChild(weatherDiv);
    }

    function displayClothingRecommendations(data) {
        const recommendationsDiv = document.createElement('div');
        const temp = data.current_weather.temperature;
        const windSpeed = data.current_weather.windspeed;
        const weatherCode = data.current_weather.weathercode;

        let recommendations = '';

        if (temp < 10) {
            recommendations = 'Wear warm clothes like a coat, scarf, and gloves.';
        } else if (temp >= 10 && temp < 20) {
            recommendations = 'Wear a light jacket or sweater.';
        } else {
            recommendations = 'Wear light clothes like a t-shirt and shorts.';
        }

        if (windSpeed > 20) {
            recommendations += ' It is windy, consider wearing windproof clothing.';
        }

        if (weatherCode === 'rain') {
            recommendations += ' It is raining, wear waterproof clothing and carry an umbrella.';
        } else if (weatherCode === 'snow') {
            recommendations += ' It is snowing, wear warm and waterproof clothing.';
        }

        recommendationsDiv.innerHTML = `
            <h2>Clothing Recommendations</h2>
            <p>${recommendations}</p>
        `;
        app.appendChild(recommendationsDiv);
    }
});
