import React, { useState, useEffect, useContext } from "react";
import { Button } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { TripContext } from "../contexts/TripProvider";
import { FareService } from "../services/fare.service";
import LanguageController from "./LanguageController";
import StationSelect from "./StationSelect";
import CalculationResult from "./CalculationResult";
import "../styles/Calculator.scss";

const Calculator = () => {
  const { t: translate } = useTranslation();
  const {
    trip,
    travelRoute,
    setSource,
    setDestination,
    setTravelRoute,
    resetTrip,
    resetTravelRoute,
  } = useContext(TripContext);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isFormInvalid, setFormInValid] = useState<boolean>(false);

  const showTravelRoute = travelRoute.route.length > 0 && trip.source && trip.destination;
  const calculateRoute = () => {
    const travelRoute = FareService.calculate(trip.source, trip.destination);
    setTravelRoute(travelRoute);
  };

  const resetForm = () => {
    resetTravelRoute();
    resetTrip();
    setErrorMessage("");
  };

  useEffect(() => {
    const isFormValid =
      trip.source.length === 0 || trip.destination.length === 0;
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
      {showTravelRoute && <CalculationResult travelRoute={travelRoute} />}
    </section>
  );
};

const ErrorMessage = ({ errorMessage }: { errorMessage: string }) => {
  return <div className="form-error-message">{errorMessage}</div>;
};

export default Calculator;
