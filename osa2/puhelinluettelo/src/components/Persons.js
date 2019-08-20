import React from "react";

const Persons = ({ filteredPersons, handlePersonRemoval }) => {
	return (
		<table className="persons">
			<tbody>
				{filteredPersons.map(person => {
					return (
						<tr key={person.name}>
							<td>{person.name}</td>
							<td>{person.number}</td>
							<td
								onClick={() => handlePersonRemoval(person)}
								className="persons__remove"
							>
								&times;
							</td>
						</tr>
					);
				})}
			</tbody>
		</table>
	);
};

export default Persons;
