import React, { useState } from "react";
import { FareService } from "../services/fare.service";
import { METRO_STATION, MRT_BLUE_LINE } from "../types/MetroStation";

function Calculator() {
  const [source, setSource] = useState<string>('');
  const [destination, setDestination] = useState<string>('');
  const [fare, setFare] = useState<number | undefined>(undefined);

  const calculateRoute = () => {
    const fare = FareService.calculate(source as METRO_STATION, destination as METRO_STATION);
    setFare(fare);
  };


  const resetForm = () => {
    setSource('');
    setDestination('');
    setFare(undefined);
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
      <SelectComponent title="Source" onChange={setSource}/>
      <br />
      <SelectComponent title="Destination" onChange={setDestination}/>
      <br />
      <button onClick={resetForm}>Reset</button>
      <button onClick={calculateRoute}>Search</button>
      {fare && fare}
    </div>
  );
}

const SelectComponent = ({ title, onChange}: {title: string, onChange: Function}) => {
  const getLabel = (key: string): string => {
    return key.replace("_", " ");
  }
  return (
    <>
      <span>{title}</span>
      <select onChange={(e) => onChange(e.target.value)}>
        {Object.keys(MRT_BLUE_LINE).map((stationKey) => {
          return (
            <option key={stationKey} value={stationKey}>
              {getLabel(stationKey)}
            </option>
          );
        })}
      </select>
    </>
  );
}

export default Calculator;
