import React, { useState, useEffect } from "react";
import axios from "axios";

const Weather = ({ country }) => {
	const [weather, setWeather] = useState({});

	// Fetch capital weather information
	useEffect(() => {
		let didCancel = false;

		axios
			.get(
				`https://api.apixu.com/v1/current.json?key=d2595e26b0da4168814172021191808&q=${
					country.capital
				}`
			)
			.then(response => {
				if (!didCancel) {
					setWeather(response.data.current);
				}
			});

		return () => {
			didCancel = true;
		};
	}, [country]);

	return (
		<>
			<h3>Weather in {country.capital}</h3>
			{weather.temp_c ? (
				<>
					<p>
						<strong>Temperature: {weather.temp_c} &deg;C</strong>
					</p>
					<p>
						<strong>
							Wind: {weather.wind_kph} kph ({weather.wind_dir})
						</strong>
					</p>
				</>
			) : (
				<p>Weather info not available</p>
			)}
		</>
	);
};

export default Weather;
