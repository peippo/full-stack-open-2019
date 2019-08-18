import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

const App = props => {
	const [selected, setSelected] = useState(0);
	const [points, setPoints] = useState([]);
	const [highestScore, setHighestScore] = useState(0);
	const [topAnecdote, setTopAnecdote] = useState(-1);

	const handleNextClick = () => {
		const randomNumber = Math.floor(Math.random() * anecdotes.length);
		setSelected(randomNumber);
	};

	const handleVoteClick = selected => {
		const newPoints = [...points];
		newPoints[selected] += 1;
		setPoints([...newPoints]);

		if (points[selected] >= highestScore) {
			setTopAnecdote(selected);
			setHighestScore(points[selected]);
		}
	};

	useEffect(() => {
		const emptyVoteArray = Array.apply(null, new Array(anecdotes.length)).map(
			Number.prototype.valueOf,
			0
		);
		setPoints(emptyVoteArray);
	}, []);

	return (
		<>
			<h2>Anecdote of the day</h2>
			<button onClick={() => handleNextClick()}>Next anecdote</button>
			<button onClick={() => handleVoteClick(selected)}>Vote</button>
			<p>{props.anecdotes[selected]}</p>
			<p>Has {points[selected]} votes</p>

			<h2>Anecdote with the most votes</h2>

			{topAnecdote > -1 ? (
				<p>{props.anecdotes[topAnecdote]}</p>
			) : (
				<p>No votes yet</p>
			)}
		</>
	);
};

const anecdotes = [
	"If it hurts, do it more often",
	"Adding manpower to a late software project makes it later!",
	"The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
	"Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
	"Premature optimization is the root of all evil.",
	"Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
