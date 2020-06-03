import React, { useState } from "react";
import { FareService } from "../services/fare.service";

function Calculator() {
  const [source, setSource] = useState<string>("");
  const [destination, setDestination] = useState<string>("");
  const [fare, setFare] = useState<number | null>(null);

  const calculateRoute = () => {
    console.log(source, destination);
    const fare = FareService.calculate(source, destination);
    setFare(fare);
  };

  const resetForm = () => {
    setSource("");
    setDestination("");
    setFare(null);
  };

  return (
    <div
      style={{
        width: 500,
        height: 400,
        border: "black 1px solid",
        padding: "10px",
      }}
    >
      <h1>Metro Fare</h1>
      Source{" "}
      <input
        type="text"
        value={source}
        onChange={(e) => setSource(e.target.value)}
      />
      <br />
      Destination
      <input
        type="text"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
      />{" "}
      <br />
      <button onClick={resetForm}>Reset</button>
      <button onClick={calculateRoute}>Search</button>
      {fare && fare}
    </div>
  );
}

export default Calculator;
