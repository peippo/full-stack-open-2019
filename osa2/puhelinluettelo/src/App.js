import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import phonebookService from "./services/phonebook";

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

	const removePerson = personToBeRemoved => {
		if (window.confirm(`Remove ${personToBeRemoved.name}?`)) {
			phonebookService.remove(personToBeRemoved.id);
			setPersons(
				persons.filter(person => person.id !== personToBeRemoved.id)
			);
		}
	};

	// fetch initial persons data from server
	useEffect(() => {
		phonebookService.getAll().then(initialPersons => {
			setPersons(initialPersons);
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
			if (
				window.confirm(
					`${newName} is already in the phonebook, update number?`
				)
			) {
				const oldPerson = persons.find(
					person => person.name === newName
				);
				const updatedPerson = { ...oldPerson, number: newNumber };
				phonebookService
					.update(oldPerson.id, updatedPerson)
					.then(response => {
						setPersons(
							persons.map(person =>
								oldPerson.id !== person.id ? person : response
							)
						);
					});
			}
		} else if (newName === "") {
			alert("Enter a name");
		} else {
			const newPerson = {
				name: newName,
				number: newNumber
			};

			phonebookService.create(newPerson).then(returnedPerson => {
				setPersons(persons.concat(returnedPerson));
			});
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
			<Persons
				filteredPersons={filteredPersons}
				removePerson={removePerson}
			/>
		</>
	);
};

export default App;
