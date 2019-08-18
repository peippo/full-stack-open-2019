import React, { useState, useEffect } from "react";
import axios from "axios";
import CountryInfo from "./components/CountryInfo";
import "./App.css";

function App() {
	const [countries, setCountries] = useState([]);
	const [filteredCountries, setFilteredCountries] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");

	const handleSearchChange = event => {
		setSearchTerm(event.target.value);
	};

	const handleDetailsClick = countryName => {
		setSearchTerm(countryName);
	};

	const CountryList = ({ countries }) => {
		if (countries.length > 10) {
			return <p>Too many matches...</p>;
		} else if (countries.length < 10 && countries.length > 1) {
			return countries.map(country => (
				<div key={country.numericCode} className="filter__suggestion">
					<p>{country.name}</p>
					<button onClick={() => handleDetailsClick(country.name)}>
						Details
					</button>
				</div>
			));
		} else {
			return countries.map(country => (
				<CountryInfo key={country.numericCode} country={country} />
			));
		}
	};

	// Filter countries based on searchTerm
	useEffect(() => {
		const filtered = countries.filter(country =>
			country.name.toLowerCase().includes(searchTerm.toLowerCase())
		);
		setFilteredCountries(filtered);
	}, [countries, searchTerm]);

	// Fetch all countries list
	useEffect(() => {
		axios.get("https://restcountries.eu/rest/v2/all").then(response => {
			setCountries(response.data);
		});
	}, []);

	return (
		<>
			<form>
				Find countries:{" "}
				<input
					value={searchTerm}
					onChange={event => handleSearchChange(event)}
					type="text"
				/>
			</form>
			{searchTerm && <CountryList countries={filteredCountries} />}
		</>
	);
}

export default App;
