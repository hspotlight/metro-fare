import React, { useState, useEffect } from "react";
import {
  Button,
  Select,
  InputLabel,
  FormControl,
  FormHelperText,
} from "@material-ui/core";
import { FareService, TravelRoute } from "../services/fare.service";
import { METRO_STATION } from "../types";
import { FindRouteMethod } from "../services/graph.service";
import CalculationResult from "./CalculationResult";
import { useTranslation } from "react-i18next";
import LanguageController from "./LanguageController";
import StationSelect from "./StationSelect";
import "../styles/Calculator.scss";

const Calculator = () => {
  const { t: translate } = useTranslation();
  const [source, setSource] = useState<string>("");
  const [destination, setDestination] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [travelRoute, setTravelRoute] = useState<TravelRoute | undefined>(
    undefined
  );
  const [findRouteMethod, setFindRouteMethod] = useState<FindRouteMethod>(
    "lowestHop"
  );
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
    setFindRouteMethod("lowestHop");
    setTravelRoute(undefined);
  };

  useEffect(() => {
    const isFormValid = source.length === 0 || destination.length === 0;
    setFormInValid(isFormValid);
  }, [source, destination]);

  return (
    <section className="calculator-container">
      <section className="header">
        <h1>Metro Fare</h1>
        <LanguageController />
      </section>
      <StationSelect
        title={translate("route.source")}
        value={source}
        onChange={setSource}
      />
      <StationSelect
        title={translate("route.destination")}
        value={destination}
        onChange={setDestination}
      />
      <FormControl style={{ width: "100%" }} required>
        <InputLabel htmlFor={"find-route-method"}>
          {translate("findRouteMethod.method")}
        </InputLabel>
        <Select
          native
          onChange={(e: any) =>
            setFindRouteMethod(e.target.value as FindRouteMethod)
          }
          name={"Line"}
          value={findRouteMethod}
          inputProps={{
            id: "find-route-method",
          }}
        >
          <option value={"lowestHop"}>
            {translate("findRouteMethod.lowestHop")}
          </option>
          <option value={"lowestFare"}>
            {translate("findRouteMethod.lowestFare")}
          </option>
        </Select>
        <FormHelperText>{translate("common.required")}</FormHelperText>
      </FormControl>

      <section className="form-button-group">
        <Button variant="contained" color="secondary" onClick={resetForm}>
          {translate("common.reset")}
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={calculateRoute}
          style={{ marginLeft: "20px" }}
          disabled={isFormInvalid}
        >
          {translate("common.search")}
        </Button>
      </section>
      {errorMessage.length > 0 && <ErrorMessage errorMessage={errorMessage} />}
      {travelRoute && <CalculationResult travelRoute={travelRoute} />}
    </section>
  );
};

const ErrorMessage = ({ errorMessage }: { errorMessage: string }) => {
  return <div className="form-error-message">{errorMessage}</div>;
};

export default Calculator;
