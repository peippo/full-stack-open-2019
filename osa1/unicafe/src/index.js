import React, { useState } from "react";
import ReactDOM from "react-dom";

const Statistics = ({ good, neutral, bad, total }) => {
	return (
		<>
			<h2>Statistics</h2>
			{total ? (
				<>
					<Statistic text="Good" value={good} />
					<Statistic text="Neutral" value={neutral} />
					<Statistic text="Bad" value={bad} />
					<Statistic text="All" value={total} />
					<Statistic
						text="Average"
						value={(total && (good - bad) / total).toFixed(2)}
					/>
					<Statistic
						text="Positive"
						value={(total && (good / total) * 100).toFixed(2)}
						symbol="%"
					/>
				</>
			) : (
				<p>No feedback given</p>
			)}
		</>
	);
};

const Statistic = ({ text, value, symbol }) => (
	<p>
		{text}: {value}
		{symbol}
	</p>
);

const Button = ({ type, handleClick, children }) => (
	<button onClick={() => handleClick(type)}>{children}</button>
);

const App = () => {
	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);
	const [total, setTotal] = useState(0);

	const handleClick = type => {
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
			<h2>Give feedback</h2>
			<Button type="good" handleClick={handleClick}>
				Good
			</Button>
			<Button type="neutral" handleClick={handleClick}>
				Neutral
			</Button>
			<Button type="bad" handleClick={handleClick}>
				Bad
			</Button>
			<Statistics good={good} neutral={neutral} bad={bad} total={total} />
		</>
	);
};

ReactDOM.render(<App />, document.getElementById("root"));
