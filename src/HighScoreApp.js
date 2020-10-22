import React, { useEffect, useState } from "react";
import "./App.css";
import Leaderboard from "./components/Leaderboard";

function HighScoreApp() {
  const [currentNumber, setCurrentNumber] = useState(0);
  const [numberOfClicks, setNumberOfClicks] = useState(0);
  const [inputName, setInputName] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const [players, setPlayers] = useState(null)

  useEffect(() => {
    if (numberOfClicks === 10) {
      setIsDisabled((prev) => !prev);
    }
  }, [numberOfClicks]);

  useEffect(() => {
    fetch("http://localhost:3000/players").then(res => res.json()).then(data => setPlayers(data))
  },[])

  const handleGetNumber = () => {
    if (!isDisabled && numberOfClicks < 10) {
      setNumberOfClicks((prev) => prev + 1);
      let randomNumber = Math.floor(Math.random() * (100 + 100) - 100);
      setCurrentNumber(randomNumber);
    }
  };

  const handleInputName = (e) => {
    setInputName(e.target.value);
  };

  const onSubmit = async () => {
    const gameData = {
      id: 6,
      name: inputName,
      totalPoints: currentNumber,
      clicks: numberOfClicks,
    };
    try {
      const response = await fetch("http://localhost:3000/players", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(gameData),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error.message);
    } finally {
      alert("Successfully submitted score!");
      resetGame();
    }
  };

  const resetGame = () => {
    setNumberOfClicks(0);
    setCurrentNumber(0);
    setIsDisabled(false);
  };

  return (
    <div className="App">
      <h1>High Score App</h1>
      <div>Name: {inputName}</div>
      <div>Number of Clicks: {numberOfClicks}</div>
      <div>Current high score: {currentNumber}</div>
      <input
        type="text"
        placeholder="Name"
        value={inputName}
        onChange={handleInputName}
      ></input>
      <button onClick={handleGetNumber} disabled={isDisabled}>
        Get Number
      </button>
      <button onClick={onSubmit}>Submit</button>
      <Leaderboard players={players}/>
    </div>
  );
}

export default HighScoreApp;
