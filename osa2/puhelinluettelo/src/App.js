import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
	const [persons, setPersons] = useState([
		{ name: "Arto Hellas", number: "040-123456" },
		{ name: "Ada Lovelace", number: "39-44-5323523" },
		{ name: "Dan Abramov", number: "12-43-234345" },
		{ name: "Mary Poppendieck", number: "39-23-6423122" }
	]);
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
