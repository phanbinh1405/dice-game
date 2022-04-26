import React from "react";

export default function Dice(props) {
  const { value, isHeld, holdDice } = props;

  return (
    <div className={`dice ${isHeld ? "active" : ""}`} onClick={holdDice}>
      <img src={`./images/${value}.png`} alt="" />
    </div>
  );
}
