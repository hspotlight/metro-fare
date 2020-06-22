import React, { useState, useEffect } from "react";
import {
  Button,
  Select,
  InputLabel,
  FormControl,
  FormHelperText,
} from "@material-ui/core";
import { FareService, TravelRoute } from "../services/fare.service";
import {
  METRO_STATION,
  BTS_SILOM_STATION,
} from "../types";
import { STATION_NAME, STATION_NAME_KEY, Station } from "../data/StationName";
import { FindRouteMethod } from "../services/graph.service";
import CalculationResult from "./CalculationResult";
import "../styles/Calculator.scss";

const Calculator = () => {
  const [source, setSource] = useState<string>("");
  const [destination, setDestination] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [travelRoute, setTravelRoute] = useState<TravelRoute | undefined>(
    undefined
  );
  const [findRouteMethod, setFindRouteMethod] = useState<FindRouteMethod>('lowestHop');
  const [isFormInvalid, setFormInValid] = useState<boolean>(false);

  const calculateRoute = () => {
    const travelRoute = FareService.calculate(
      source as METRO_STATION,
      destination as METRO_STATION,
      findRouteMethod
    );
    setTravelRoute(travelRoute);
  };

  const resetForm = () => {
    setSource("");
    setDestination("");
    setErrorMessage("");
    setFindRouteMethod('lowestHop');
    setTravelRoute(undefined);
  };

  useEffect(() => {
    const isFormValid = source === destination || (source.length === 0 || destination.length === 0);
    setFormInValid(isFormValid);
    if (source === destination && source.length > 0) {
      setErrorMessage("source and destination cannot be the same");
    } else {
      setErrorMessage("");
    }
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
      <FormControl style={{ width: "100%" }} required>
        <InputLabel htmlFor={'find-route-method'}>Method</InputLabel>
        <Select
          native
          onChange={(e: any) => setFindRouteMethod(e.target.value as FindRouteMethod)}
          name={"Line"}
          value={findRouteMethod}
          inputProps={{
            id: 'find-route-method',
          }}
        >
          <option value={"lowestHop"}>Lowest Hop</option>
          <option value={'lowestFare'}>Lowest Fare</option>
        </Select>
        <FormHelperText>Required</FormHelperText>
      </FormControl>
      <section className="form-button-group">
        <Button variant="contained" color="secondary" onClick={resetForm}>
          Reset
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={calculateRoute}
          style={{ marginLeft: "20px" }}
          disabled={isFormInvalid}
        >
          Search
        </Button>
      </section>
      {errorMessage.length > 0 && <ErrorMessage errorMessage={errorMessage} />}
      {travelRoute !== undefined && CalculationResult(travelRoute)}
    </section>
  );
};

const ErrorMessage = ({ errorMessage }: { errorMessage: string }) => {
  return <div className="form-error-message">{errorMessage}</div>;
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

  const handleLineTypeSelectChange = (value: string) => {
    setLineType(value as STATION_NAME_KEY);
    onChange("");
  };

  useEffect(() => {
    if (Object.values(BTS_SILOM_STATION).find((btsKey => btsKey === value))) {
      setLineType("BTS");
    } else if (value.length !== 0) {
      setLineType("MRT_BLUE");
    }
  }, [value]);

  return (
    <section>
      <FormControl style={{ width: "80px" }} required>
        <InputLabel htmlFor={lineElementId}>Line</InputLabel>
        <Select
          native
          onChange={(e: any) => handleLineTypeSelectChange(e.target.value)}
          name={"Line"}
          value={lineType}
          inputProps={{
            id: lineElementId,
          }}
        >
          <option value={"MRT_BLUE"}>MRT</option>
          <option value={"BTS"}>BTS</option>
        </Select>
        <FormHelperText>Required</FormHelperText>
      </FormControl>
      <FormControl style={{ width: "calc(100% - 80px)" }} required>
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
          {stationsName.map((station: Station) => {
            const label = station.nameEN;
            return (
              <option key={station.key} value={station.key}>
                {label}
              </option>
            );
          })}
        </Select>
        <FormHelperText>Required</FormHelperText>
      </FormControl>
    </section>
  );
};

export default Calculator;
