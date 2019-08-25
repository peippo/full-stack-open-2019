import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";
import phonebookService from "./services/phonebook";
import "./App.css";

const App = () => {
	const [persons, setPersons] = useState([]);
	const [filteredPersons, setFilteredPersons] = useState(persons);
	const [searchTerm, setSearchTerm] = useState("");
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [notification, setNotification] = useState({
		message: null,
		isError: false
	});

	const handleNameChange = event => {
		setNewName(event.target.value);
	};

	const handleNumberChange = event => {
		setNewNumber(event.target.value);
	};

	const handleSearchChange = event => {
		setSearchTerm(event.target.value);
	};

	const handlePersonRemoval = personToBeRemoved => {
		if (window.confirm(`Remove ${personToBeRemoved.name}?`)) {
			phonebookService
				.remove(personToBeRemoved.id)
				.then(() => {
					setPersons(
						persons.filter(
							person => person.id !== personToBeRemoved.id
						)
					);
					setNotification({
						message: `${personToBeRemoved.name} was removed successfully!`,
						isError: false
					});
					setTimeout(() => {
						setNotification({ message: null, isError: false });
					}, 4000);
				})
				.catch(error => {
					setNotification({ message: `${error}!`, isError: true });

					setTimeout(() => {
						setNotification({ message: null, isError: false });
					}, 4000);
					setPersons(
						persons.filter(
							person => person.id !== personToBeRemoved.id
						)
					);
				});
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

	const handleAddClick = event => {
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
						setNotification({
							message: `Number associated with '${oldPerson.name}' updated successfully!`,
							isError: false
						});
						setTimeout(() => {
							setNotification({ message: null, isError: false });
						}, 4000);
					})
					.catch(error => {
						setNotification({
							message: `${error}!`,
							isError: true
						});

						setTimeout(() => {
							setNotification({ message: null, isError: false });
						}, 4000);
						setPersons(
							persons.filter(person => person.id !== oldPerson.id)
						);
					});
			}
		} else if (newName === "") {
			alert("Enter a name");
		} else if (newNumber === "") {
			alert("Enter a number");
		} else {
			const newPerson = {
				name: newName,
				number: newNumber
			};

			phonebookService.create(newPerson).then(returnedPerson => {
				setPersons(persons.concat(returnedPerson));
				setNotification({
					message: `'${returnedPerson.name}' was added successfully!`,
					isError: false
				});
				setTimeout(() => {
					setNotification({ message: null, isError: false });
				}, 4000);
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
			<Notification notification={notification} />
			<Persons
				filteredPersons={filteredPersons}
				handlePersonRemoval={handlePersonRemoval}
			/>
			<h2>Add new contact</h2>
			<PersonForm
				newName={newName}
				newNumber={newNumber}
				handleNameChange={handleNameChange}
				handleNumberChange={handleNumberChange}
				handleAddClick={handleAddClick}
			/>
		</>
	);
};

export default App;
