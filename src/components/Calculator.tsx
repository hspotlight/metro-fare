import React, { useState, useEffect, useContext } from "react";
import {
  Button,
  Select,
  InputLabel,
  FormControl,
  FormHelperText,
} from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { TripContext } from "../contexts/TripProvider";
import { FareService, TravelRoute } from "../services/fare.service";
import { FindRouteMethod } from "../services/graph.service";
import LanguageController from "./LanguageController";
import StationSelect from "./StationSelect";
import CalculationResult from "./CalculationResult";
import "../styles/Calculator.scss";

const Calculator = () => {
  const { t: translate } = useTranslation();
  const { trip, setSource, setDestination, resetTrip } = useContext(TripContext);
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
      trip.source,
      trip.destination,
      findRouteMethod
    );
    setTravelRoute(travelRoute);
  };

  const resetForm = () => {
    resetTrip()
    setErrorMessage("");
    setFindRouteMethod("lowestHop");
    setTravelRoute(undefined);
  };

  useEffect(() => {
    const isFormValid = trip.source.length === 0 || trip.destination.length === 0;
    setFormInValid(isFormValid);
  }, [trip]);

  return (
    <section className="calculator-container">
      <section className="header">
        <h1>Metro Fare</h1>
        <LanguageController />
      </section>
      <StationSelect
        title={translate("route.source")}
        value={trip.source}
        onChange={setSource}
      />
      <StationSelect
        title={translate("route.destination")}
        value={trip.destination}
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
