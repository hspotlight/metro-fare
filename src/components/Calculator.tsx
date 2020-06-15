import React, { useState, useEffect } from "react";
import { FareService, TravelRoute } from "../services/fare.service";
import { METRO_STATION } from "../types/MetroStation";
import { STATION_NAME, STATION_NAME_KEY } from "../data/StationName";
import {
  Button,
  Select,
  InputLabel,
  FormControl,
  FormHelperText,
} from "@material-ui/core";
import "../styles/Calculator.scss";

const Calculator = () => {
  const [source, setSource] = useState<string>("");
  const [destination, setDestination] = useState<string>("");
  const [travelRoute, setTravelRoute] = useState<TravelRoute | undefined>(
    undefined
  );
  const [isFormValid, setFormValid] = useState<boolean>(false);

  const calculateRoute = () => {
    const travelRoute = FareService.calculate(
      source as METRO_STATION,
      destination as METRO_STATION
    );
    setTravelRoute(travelRoute);
  };

  const resetForm = () => {
    setSource("");
    setDestination("");
    setTravelRoute(undefined);
  };

  useEffect(() => {
    setFormValid(source.length === 0 || destination.length === 0);
  }, [source, destination]);

  return (
    <section className="calculator-container">
      <h1>Metro Fare</h1>
      <SelectStationComponent
        title="Source"
        value={source}
        onChange={setSource}
      />
      <SelectStationComponent
        title="Destination"
        value={destination}
        onChange={setDestination}
      />
      <section className="form-button-group">
        <Button variant="contained" color="secondary" onClick={resetForm}>
          Reset
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={calculateRoute}
          style={{ marginLeft: "20px" }}
          disabled={isFormValid}
        >
          Search
        </Button>
      </section>
      {travelRoute !== undefined && CalculationResult(travelRoute)}
    </section>
  );
};

const SelectStationComponent = ({
  title,
  value,
  onChange,
}: {
  title: string;
  value: string;
  onChange: Function;
}) => {
  const [lineType, setLineType] = useState<STATION_NAME_KEY>("MRT_BLUE");
  const lineElementId = title + "-line-native-required";
  const selectElementId = title + "-native-required";
  const stationsName = STATION_NAME[lineType];
  const getLabel = (key: string): string => {
    return key.replace(/_/g, " ");
  };

  return (
    <>
      <FormControl required>
        <InputLabel htmlFor={lineElementId}>Line</InputLabel>
        <Select
          native
          onChange={(e) => setLineType(e.target.value as STATION_NAME_KEY)}
          name={"Line"}
          value={lineType}
          inputProps={{
            id: lineElementId,
          }}
        >
          <option value={"MRT_BLUE"} selected>
            MRT
          </option>
          <option value={"BTS"}>BTS</option>
        </Select>
        <FormHelperText>Required</FormHelperText>
      </FormControl>
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
          {stationsName.map((stationKey: string) => {
            const label = getLabel(stationKey);
            return (
              <option key={stationKey} value={stationKey}>
                {label}
              </option>
            );
          })}
        </Select>
        <FormHelperText>Required</FormHelperText>
      </FormControl>
    </>
  );
};

function CalculationResult(travelRoute: TravelRoute): React.ReactNode {
  return (
    <div>
      <div>Fare: {travelRoute.fare}</div>
      <div className="travel-route-container">
        {travelRoute.route[0].route.map((stationKey, index) => {
          const dashline = <div className="mrt-blue-dotted-line"></div>;
          return (
            <section key={stationKey}>
              {index > 0 && dashline}
              <section className="station-container">
                <div className="mrt-blue-icon"></div>
                <div>{stationKey}</div>
              </section>
            </section>
          );
        })}
      </div>
    </div>
  );
}

export default Calculator;
