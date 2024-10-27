document.addEventListener("DOMContentLoaded", () => {
	const app = document.getElementById("app");

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
		const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,relative_humidity_2m,dew_point_2m,apparent_temperature,precipitation_probability,precipitation,weather_code,pressure_msl,surface_pressure,cloud_cover,visibility,wind_speed_10m&forecast_days=1`;

		const_example_data = {
			latitude: 52.52,
			longitude: 13.419998,
			generationtime_ms: 0.13697147369384766,
			utc_offset_seconds: 0,
			timezone: "GMT",
			timezone_abbreviation: "GMT",
			elevation: 38,
			hourly_units: {},
			hourly: {
				time: [
					"2024-10-27T00:00",
					"2024-10-27T01:00",
					"2024-10-27T02:00",
					"2024-10-27T03:00",
					"2024-10-27T04:00",
					"2024-10-27T05:00",
					"2024-10-27T06:00",
					"2024-10-27T07:00",
					"2024-10-27T08:00",
					"2024-10-27T09:00",
					"2024-10-27T10:00",
					"2024-10-27T11:00",
					"2024-10-27T12:00",
					"2024-10-27T13:00",
					"2024-10-27T14:00",
					"2024-10-27T15:00",
					"2024-10-27T16:00",
					"2024-10-27T17:00",
					"2024-10-27T18:00",
					"2024-10-27T19:00",
					"2024-10-27T20:00",
					"2024-10-27T21:00",
					"2024-10-27T22:00",
					"2024-10-27T23:00",
				],
				temperature_2m: [
					10.2, 9.7, 9.3, 8.9, 8.6, 8.3, 7.9, 7.9, 9, 11.4, 13, 14.4, 14.9,
					14.7, 14.8, 14.8, 14.5, 14.1, 13, 12, 11.2, 10.4, 9.7, 9.1,
				],
				relative_humidity_2m: [
					92, 92, 92, 93, 94, 94, 95, 95, 90, 88, 81, 77, 77, 79, 81, 82, 86,
					86, 92, 95, 97, 95, 94, 94,
				],
				dew_point_2m: [
					9, 8.5, 8.1, 7.8, 7.7, 7.4, 7.1, 7.2, 7.5, 9.5, 9.8, 10.4, 10.9, 11.1,
					11.6, 11.8, 12.2, 11.8, 11.7, 11.3, 10.7, 9.7, 8.8, 8.2,
				],
				apparent_temperature: [
					8.8, 8, 7.6, 7.2, 7, 6.7, 6.2, 6.2, 7.4, 9.8, 11.2, 12.9, 13.5, 13.2,
					13.8, 14.2, 13.4, 13.2, 12.3, 11.4, 10.7, 9.6, 8.8, 7.9,
				],
				precipitation_probability: [
					0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
					0,
				],
				precipitation: [
					0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
					0,
				],
				weather_code: [
					1, 1, 1, 1, 1, 3, 1, 2, 2, 1, 2, 3, 3, 3, 3, 3, 3, 3, 2, 1, 2, 0, 0,
					0,
				],
				pressure_msl: [
					1018.7, 1018, 1017.9, 1017.4, 1017.4, 1017, 1017.1, 1017.5, 1017.6,
					1017.6, 1017.6, 1017.4, 1017.8, 1018.6, 1019.6, 1019.9, 1021, 1021.9,
					1022.9, 1023.5, 1024.2, 1024.3, 1024.7, 1024.8,
				],
				surface_pressure: [
					1014, 1013.3, 1013.2, 1012.7, 1012.7, 1012.3, 1012.4, 1012.8, 1012.9,
					1013, 1013, 1012.8, 1013.2, 1014, 1015, 1015.3, 1016.4, 1017.3,
					1018.3, 1018.9, 1019.5, 1019.6, 1020, 1020.1,
				],
				cloud_cover: [
					7, 19, 47, 0, 23, 100, 8, 35, 60, 60, 69, 91, 100, 99, 100, 91, 79,
					88, 44, 28, 62, 0, 0, 0,
				],
				visibility: [
					8900, 9740, 9740, 7600, 6880, 5400, 4040, 3760, 7780, 9800, 20960,
					31240, 33260, 29100, 28260, 27600, 18440, 18820, 9060, 4660, 2920,
					4160, 6160, 6980,
				],
				wind_speed_10m: [
					7.6, 9, 8.3, 7.7, 7.2, 7, 6.9, 7, 7.2, 9.7, 11.7, 11, 12.2, 13, 10.1,
					8.3, 12.3, 9.7, 8.2, 7.2, 5.2, 5.1, 4.7, 4.7,
				],
			},
		};

		fetch(apiUrl)
			.then((response) => response.json())
			.then((data) => {
				displayWeatherData(data);
				displayClothingRecommendations(data);
				displayDetailedWeatherInfo(data);
			})
			.catch((error) => {
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
		const weatherDiv = document.createElement("div");
		weatherDiv.className = "weather";
		const weatherIcons = {
			0: "☀️", // Clear sky
			1: "🌤️", // Mainly clear
			2: "⛅", // Partly cloudy
			3: "☁️", // Overcast
			45: "🌫️", // Fog
			48: "🌫️", // Depositing rime fog
			51: "🌦️", // Drizzle: Light
			53: "🌦️", // Drizzle: Moderate
			55: "🌦️", // Drizzle: Dense intensity
			56: "🌧️", // Freezing Drizzle: Light
			57: "🌧️", // Freezing Drizzle: Dense intensity
			61: "🌧️", // Rain: Slight
			63: "🌧️", // Rain: Moderate
			65: "🌧️", // Rain: Heavy intensity
			66: "🌨️", // Freezing Rain: Light
			67: "🌨️", // Freezing Rain: Heavy intensity
			71: "❄️", // Snow fall: Slight
			73: "❄️", // Snow fall: Moderate
			75: "❄️", // Snow fall: Heavy intensity
			77: "❄️", // Snow grains
			80: "🌧️", // Rain showers: Slight
			81: "🌧️", // Rain showers: Moderate
			82: "🌧️", // Rain showers: Violent
			85: "❄️", // Snow showers slight
			86: "❄️", // Snow showers heavy
			95: "⛈️", // Thunderstorm: Slight or moderate
			96: "⛈️", // Thunderstorm with slight hail
			99: "⛈️", // Thunderstorm with heavy hail
		};
		const weatherIcon = weatherIcons[data.current_weather.weathercode] || "❓";
		weatherDiv.innerHTML = `
            <h2>Wetter an Ihrem Standort</h2>
            <p>Temperatur: ${data.current_weather.temperature}°C</p>
            <p>Wetter: ${weatherIcon}</p>
        `;
		app.appendChild(weatherDiv);
	}

	function displayClothingRecommendations(data) {
		const recommendationsDiv = document.createElement("div");
		recommendationsDiv.className = "recommendations";
		const temp = data.current_weather.temperature;
		const windSpeed = data.current_weather.windspeed;
		const weatherCode = data.current_weather.weathercode;

		const layer1 = document.createElement("div");
		layer1.className = "layer";
		const layer2 = document.createElement("div");
		layer2.className = "layer";
		const layer3 = document.createElement("div");
		layer3.className = "layer";

		// Layer 1: Unterwäsche
		if (temp < 5) {
			layer1.innerHTML =
				"<h3>Schicht 1: Unterwäsche</h3><p>Thermo-Unterwäsche, Thermo-Socken</p>";
		} else {
			layer1.innerHTML =
				"<h3>Schicht 1: Unterwäsche</h3><p>Normale Unterwäsche, Socken</p>";
		}

		// Layer 2: Alltagswäsche
		if (temp < 10) {
			layer2.innerHTML =
				"<h3>Schicht 2: Alltagswäsche</h3><p>Langärmliges Shirt, Pullover, lange Hose</p>";
		} else if (temp >= 10 && temp < 20) {
			layer2.innerHTML =
				"<h3>Schicht 2: Alltagswäsche</h3><p>Kurzärmliges Shirt, leichte Jacke, lange Hose</p>";
		} else {
			layer2.innerHTML =
				"<h3>Schicht 2: Alltagswäsche</h3><p>T-Shirt, Shorts oder Rock/Kleid</p>";
		}

		// Layer 3: Außenkleidung
		if (temp < 10) {
			layer3.innerHTML =
				"<h3>Schicht 3: Außenkleidung</h3><p>Winterjacke, Winterschuhe, Schal, Handschuhe, Mütze</p>";
		} else if (temp >= 10 && temp < 20) {
			layer3.innerHTML =
				"<h3>Schicht 3: Außenkleidung</h3><p>Leichte Jacke, Sportschuhe</p>";
		} else {
			layer3.innerHTML =
				"<h3>Schicht 3: Außenkleidung</h3><p>Keine Jacke, Sandalen</p>";
		}

		if (windSpeed > 20) {
			layer3.innerHTML +=
				"<p>Es ist windig, ziehen Sie winddichte Kleidung in Betracht</p>";
		}

		if (weatherCode >= 51 && weatherCode <= 67) {
			layer3.innerHTML +=
				"<p>Es regnet, tragen Sie wasserdichte Kleidung und nehmen Sie einen Regenschirm mit</p>";
		} else if (weatherCode >= 71 && weatherCode <= 77) {
			layer3.innerHTML +=
				"<p>Es schneit, tragen Sie warme und wasserdichte Kleidung</p>";
		}

		recommendationsDiv.appendChild(layer1);
		recommendationsDiv.appendChild(layer2);
		recommendationsDiv.appendChild(layer3);

		app.appendChild(recommendationsDiv);
	}

	function displayDetailedWeatherInfo(data) {
		const detailedWeatherDiv = document.createElement("div");
		detailedWeatherDiv.id = "detailed-weather-info";
		detailedWeatherDiv.innerHTML = `
            <h2>Detaillierte Wetterinformationen</h2>
            <p>Maximale Temperatur: ${data.daily.temperature_2m_max[0]}°C</p>
            <p>Minimale Temperatur: ${data.daily.temperature_2m_min[0]}°C</p>
            <p>Gefühlte maximale Temperatur: ${data.daily.apparent_temperature_max[0]}°C</p>
            <p>Gefühlte minimale Temperatur: ${data.daily.apparent_temperature_min[0]}°C</p>
            <p>Niederschlagssumme: ${data.daily.precipitation_sum[0]} mm</p>
        `;
		app.appendChild(detailedWeatherDiv);
	}
});
