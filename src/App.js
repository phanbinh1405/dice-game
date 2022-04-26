import React from "react";
import Dice from "./Dice";
import { nanoid } from "nanoid";

export default function App() {
  const [dices, setDices] = React.useState(randomNewDices());
  const [win, setWin] = React.useState(false);

  React.useEffect(() => {
    let allAreHeld = dices.every((dice) => dice.isHeld === true);
    let allDiceHaveSameValue = dices.every(
      (dice) => dices[0].value === dice.value
    );

    if (allAreHeld && allDiceHaveSameValue) {
      setWin(true);
    }
  }, [dices]);

  function randomNewDices() {
    const newDices = [];
    while (newDices.length < 10) {
      newDices.push({
        value: Math.floor(Math.random() * 6 + 1),
        isHeld: false,
        id: nanoid(),
      });
    }
    return newDices;
  }

  function generaNewDice() {
    return {
      value: Math.floor(Math.random() * 6 + 1),
      isHeld: false,
      id: nanoid(),
    };
  }

  function rollDices() {
    if (!win) {
      setDices((oldDices) =>
        oldDices.map((dice) => {
          return !dice.isHeld ? generaNewDice() : dice;
        })
      );
    } else {
      setDices(randomNewDices());
      setWin(false);
    }
  }

  function holdDice(id) {
    setDices((prev) =>
      prev.map((dice) => {
        return dice.id === id ? { ...dice, isHeld: true } : dice;
      })
    );
  }

  const diceElement = dices.map((dice) => (
    <Dice
      key={dice.id}
      value={dice.value}
      isHeld={dice.isHeld}
      holdDice={() => holdDice(dice.id)}
    />
  ));

  return (
    <main className="app-container">
      <h1>Tenzies</h1>
      <p>
        {!win
          ? `Roll until all dice are the same. Click each die to freeze it at its 
          current value between rolls.`
          : "Congratulation You Win The Game!!!"}
      </p>
      <div className="dices-container">{diceElement}</div>
      <button className="button" onClick={rollDices}>
        {!win ? "Roll" : "New Game"}
      </button>
    </main>
  );
}
