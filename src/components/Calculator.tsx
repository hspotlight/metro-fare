import React, { useState } from "react";
import { FareService } from "../services/fare.service";
import { METRO_STATION, MRT_BLUE_LINE } from "../types/MetroStation";
import { Button, Select, InputLabel, FormControl, FormHelperText } from "@material-ui/core";

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
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <h1>Metro Fare</h1>
      <SelectComponent title="Source" value={source} onChange={setSource} />
      <SelectComponent
        title="Destination"
        value={destination}
        onChange={setDestination}
      />
      <section style={{display: 'flex', width: '100%', justifyContent: 'center'}}>
        <Button variant="contained" color="secondary" onClick={resetForm}>
          Reset
        </Button>
        <Button variant="contained" color="primary" onClick={calculateRoute} style={{marginLeft: '20px'}}>
          Search
        </Button>
      </section>
    </div>
  );
}

const SelectComponent = ({ title, value, onChange}: {title: string, value: string, onChange: Function}) => {

  const selectElementId = title + "-native-required";
  const getLabel = (key: string): string => {
    return key.replace("_", " ");
  }

  return (
    <FormControl required>
      <InputLabel htmlFor={selectElementId}>{title}</InputLabel>
      <Select
        native
        onChange={(e) => onChange(e.target.value)}
        name={title}
        value={value}
        inputProps={{
          id: selectElementId,
        }}
      >
        <option value="" disabled></option>
        {Object.keys(MRT_BLUE_LINE).map((stationKey) => {
          return (
            <option key={stationKey} value={stationKey}>
              {getLabel(stationKey)}
            </option>
          );
        })}
      </Select>
      <FormHelperText>Required</FormHelperText>
    </FormControl>
  );
}

export default Calculator;
