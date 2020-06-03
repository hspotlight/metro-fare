import React, { useState } from "react";

function Calculator() {
  const [source, setSource] = useState<string>("");
  const [destination, setDestination] = useState<string>("");

  const calculateRoute = () => {
    console.log(source, destination);
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
      <button onClick={calculateRoute}>Search</button>
    </div>
  );
}

export default Calculator;
