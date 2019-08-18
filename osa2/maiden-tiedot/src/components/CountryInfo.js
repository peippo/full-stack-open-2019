import React from "react";
import Weather from "./Weather";

const CountryInfo = ({ country }) => {
	return (
		<div>
			<h2>{country.name}</h2>
			<hr />
			<p>
				<strong>Capital:</strong> {country.capital}
			</p>
			<p>
				<strong>Population:</strong> {country.population}
			</p>

			<h3>Languages</h3>
			<ul>
				{country.languages.map(language => {
					return <li key={language.iso639_1}>{language.name}</li>;
				})}
			</ul>

			<img
				className="country__flag"
				src={country.flag}
				alt={`Flag of ${country.name}`}
			/>
			<Weather country={country} />
		</div>
	);
};

export default CountryInfo;
