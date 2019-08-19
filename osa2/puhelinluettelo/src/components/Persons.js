import React from "react";

const Persons = ({ filteredPersons, removePerson }) => {
	return filteredPersons.map(person => {
		return (
			<p key={person.name}>
				{person.name} {person.number}{" "}
				<span onClick={() => removePerson(person)} className="remove">
					&times;
				</span>
			</p>
		);
	});
};

export default Persons;
