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

		const _example_data = {
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
		weatherDiv.innerHTML = `
            <h2>Wetter an Ihrem Standort</h2>
            <p>Maximale Temperatur: ${Math.max(
							...data.hourly.temperature_2m
						)}°C</p>
            <p>Minimale Temperatur: ${Math.min(
							...data.hourly.temperature_2m
						)}°C</p>
            <p>Niederschlagssumme: ${data.hourly.precipitation.reduce(
							(acc, val) => acc + val,
							0
						)} mm</p>
        `;
		app.appendChild(weatherDiv);
	}

	function displayClothingRecommendations(weatherData) {
		// Minimum temperature in degrees Celsius for the day
		const minTemperature = Math.min(...weatherData.hourly.temperature_2m);
		// Maximum temperature in degrees Celsius for the day
		const maxTemperature = Math.max(...weatherData.hourly.temperature_2m);
		// Average temperature in degrees Celsius for the day
		const average_temperature =
			weatherData.hourly.temperature_2m.reduce((acc, val) => acc + val, 0) /
			weatherData.hourly.temperature_2m.length;

		// Maximum relative humidity in percentage for the day
		const maxHumidity = Math.max(...weatherData.hourly.relative_humidity_2m);
		// Minimum relative humidity in percentage for the day
		const minHumidity = Math.min(...weatherData.hourly.relative_humidity_2m);
		// Averafe humidity in percentage over the day
		const average_humidity =
			weatherData.hourly.relative_humidity_2m.reduce(
				(acc, val) => acc + val,
				0
			) / weatherData.hourly.relative_humidity_2m.length;

		// Average Probability of precipitation in percentage
		const precipitationProbability =
			weatherData.hourly.precipitation_probability.reduce(
				(acc, val) => acc + val,
				0
			) / weatherData.hourly.precipitation_probability.length;

		// Amount of precipitation in millimeters summed up for the day
		const totalPrecipitation = weatherData.hourly.precipitation.reduce(
			(acc, val) => acc + val,
			0
		);

		// Maximum amount of precipitation in millimeters for the day
		const maxPrecipitation = Math.max(...weatherData.hourly.precipitation);
		// Minimum amount of precipitation in millimeters for the day
		const minPrecipitation = Math.min(...weatherData.hourly.precipitation);

		// Average Cloud cover in percentage
		const cloudCover =
			weatherData.hourly.cloud_cover.reduce((acc, val) => acc + val, 0) /
			weatherData.hourly.cloud_cover.length;

		// Visibility in meters
		const visibility = weatherData.hourly.visibility[0];
		// Average Wind speed at 10 meters above ground in m/s
		const average_windSpeed =
			weatherData.hourly.wind_speed_10m.reduce((acc, val) => acc + val, 0) /
			weatherData.hourly.wind_speed_10m.length;

		/*
        The criteria for the clothing recommendations should be based on the following factors:
        - Temperature (min, max, average)
        - Humidity (min, max, average)
        - Precipitation probability
        - Total precipitation
        - Cloud cover
        - Visibility
        - Wind speed (average)

        Example of how the recommendation should be structured:
        - Kopfbereich
            - Mütze
            - Sonnenbrille
            - Schal
        - Oberkörper
            - T-Shirt
            - Pullover
            - Jacke
            - Regenjacke
            - Wintermantel
        - Unterkörper
            - Hose
            - Shorts
            - Regenhose
            - Schnee-/Skihose
            - Thermo-Unterwäsche
        - Füße
            - Socken (dick, dünn, lang, kurz)
            - Regenfeste Schuhe
            - Sandalen
            - Leichte Schuhe
            - Gummistiefel
            - Winterstiefel
        - Hände
            - Handschuhe
            - Regenschirm
        */
		// Initialize recommendations object
		const recommendations = {
			Kopfbereich: [],
			Oberkörper: [],
			Unterkörper: [],
			Füße: [],
			Hände: [],
		};

		// Temperature-based recommendations
		if (average_temperature <= 0) {
			recommendations["Kopfbereich"].push("Mütze", "Schal");
			recommendations["Oberkörper"].push("Wintermantel");
			recommendations["Unterkörper"].push(
				"Thermo-Unterwäsche",
				"Schnee-/Skihose"
			);
			recommendations["Füße"].push("Winterstiefel", "Dicke Socken");
			recommendations["Hände"].push("Handschuhe");
		} else if (average_temperature > 0 && average_temperature <= 10) {
			recommendations["Kopfbereich"].push("Mütze", "Schal");
			recommendations["Oberkörper"].push("Pullover", "Jacke");
			recommendations["Unterkörper"].push("Hose");
			recommendations["Füße"].push("Regenfeste Schuhe", "Dicke Socken");
			recommendations["Hände"].push("Handschuhe");
		} else if (average_temperature > 10 && average_temperature <= 20) {
			recommendations["Kopfbereich"].push("Schal");
			recommendations["Oberkörper"].push("Pullover", "Leichte Jacke");
			recommendations["Unterkörper"].push("Hose");
			recommendations["Füße"].push("Leichte Schuhe");
		} else if (average_temperature > 20) {
			recommendations["Kopfbereich"].push("Sonnenbrille");
			recommendations["Oberkörper"].push("T-Shirt");
			recommendations["Unterkörper"].push("Shorts");
			recommendations["Füße"].push("Sandalen");
		}

		// Precipitation-based recommendations
		if (precipitationProbability > 50 || totalPrecipitation > 0) {
			recommendations["Oberkörper"].push("Regenjacke");
			recommendations["Unterkörper"].push("Regenhose");
			recommendations["Füße"].push("Gummistiefel");
			recommendations["Hände"].push("Regenschirm");
		}

		// Cloud cover-based recommendations
		if (cloudCover < 30) {
			recommendations["Kopfbereich"].push("Sonnenbrille");
		}

		// Wind speed-based recommendations
		if (average_windSpeed > 10) {
			recommendations["Oberkörper"].push("Windjacke");
		}

		// Remove duplicate recommendations
		for (let category in recommendations) {
			recommendations[category] = [...new Set(recommendations[category])];
		}

		// Create card-style UI
		const app = document.getElementById("app");

		const recommendationsDiv = document.createElement("div");
		recommendationsDiv.className = "recommendations";

		const title = document.createElement("h2");
		title.textContent = "Kleidungsempfehlungen";
		recommendationsDiv.appendChild(title);

		for (let category in recommendations) {
			const categoryCard = document.createElement("div");
			categoryCard.className = "card";

			const categoryTitle = document.createElement("h3");
			categoryTitle.textContent = category;
			categoryCard.appendChild(categoryTitle);

			const itemList = document.createElement("ul");

			recommendations[category].forEach((item) => {
				const listItem = document.createElement("li");
				listItem.textContent = item;
				itemList.appendChild(listItem);
			});

			categoryCard.appendChild(itemList);
			recommendationsDiv.appendChild(categoryCard);
		}

		app.appendChild(recommendationsDiv);
	}
});
