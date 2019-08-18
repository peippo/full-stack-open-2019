import React, { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
	const [persons, setPersons] = useState([]);
	const [filteredPersons, setFilteredPersons] = useState(persons);
	const [searchTerm, setSearchTerm] = useState("");
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");

	const handleNameChange = event => {
		setNewName(event.target.value);
	};

	const handleNumberChange = event => {
		setNewNumber(event.target.value);
	};

	const handleSearchChange = event => {
		setSearchTerm(event.target.value);
	};

	// fetch initial persons data from server
	useEffect(() => {
		axios.get("http://localhost:3001/persons").then(response => {
			setPersons(response.data);
		});
	}, []);

	// Filter persons based on searchTerm
	useEffect(() => {
		const filtered = persons.filter(person =>
			person.name.toLowerCase().includes(searchTerm.toLowerCase())
		);
		setFilteredPersons(filtered);
	}, [searchTerm, persons]);

	const handleClick = event => {
		event.preventDefault();

		if (persons.some(person => person.name === newName)) {
			alert(`${newName} is already added to phonebook`);
		} else if (newName === "") {
			alert("Enter a name");
		} else {
			setPersons([...persons, { name: newName, number: newNumber }]);
		}

		setNewName("");
		setNewNumber("");
	};

	return (
		<>
			<h1>Phonebook</h1>
			<Filter
				searchTerm={searchTerm}
				handleSearchChange={handleSearchChange}
			/>
			<h2>Add new contact</h2>
			<PersonForm
				newName={newName}
				newNumber={newNumber}
				handleNameChange={handleNameChange}
				handleNumberChange={handleNumberChange}
				handleClick={handleClick}
			/>
			<h2>Numbers</h2>
			<Persons filteredPersons={filteredPersons} />
		</>
	);
};

export default App;
