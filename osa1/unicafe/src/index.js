import React, { useState } from "react";
import ReactDOM from "react-dom";

const App = () => {
	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);
	const [total, setTotal] = useState(0);

	const handleClick = type => () => {
		setTotal(total + 1);

		switch (type) {
			case "good":
				setGood(good + 1);
				break;
			case "neutral":
				setNeutral(neutral + 1);
				break;
			case "bad":
				setBad(bad + 1);
				break;
			default:
				break;
		}
	};

	return (
		<>
			<div>
				<h2>Give feedback</h2>
				<button onClick={handleClick("good")}>Good</button>
				<button onClick={handleClick("neutral")}>Neutral</button>
				<button onClick={handleClick("bad")}>Bad</button>
			</div>
			<div>
				<h2>Statistics</h2>
				<p>Good: {good}</p>
				<p>Neutral: {neutral}</p>
				<p>Bad: {bad}</p>
				<hr />
				<p>All: {total}</p>
				<p>Average: {(total && (good - bad) / total).toFixed(2)}</p>
				<p>Positive: {(total && (good / total) * 100).toFixed(2)}%</p>
			</div>
		</>
	);
};

ReactDOM.render(<App />, document.getElementById("root"));
