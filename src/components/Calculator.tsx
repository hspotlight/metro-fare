import React, { useState, useEffect, useContext } from "react";
import { Button } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { TripContext } from "../contexts/TripProvider";
import { FareService } from "../services/fare.service";
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
  const [showCalculator, setShowCalculator] = useState<boolean>(true);
  const [showResult, setShowResult] = useState<boolean>(true);

  const showTravelRoute = travelRoute.route.length > 0 && trip.source && trip.destination;
  const calculateRoute = () => {
    const travelRoute = FareService.calculate(trip.source, trip.destination);
    setTravelRoute(travelRoute);
    setShowResult(true);
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
        <div>{translate('tab.search')}</div>
        <div
          className="chevron-icon-container"
          onClick={() => setShowCalculator(!showCalculator)}
        >
          {showCalculator ? (
            <i className="fa fa-chevron-down" aria-hidden="true" />
            ) : (
            <i className="fa fa-chevron-right" aria-hidden="true" />
          )}
        </div>
      </section>
      <section className={`detail ${showCalculator ? "show" : "hide"}`}>
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
        {errorMessage.length > 0 && (
          <ErrorMessage errorMessage={errorMessage} />
        )}
      </section>
      {showTravelRoute && (
          <>
          <section className="header">
            <div>{translate('tab.result')}</div>
            <div
              className="chevron-icon-container"
              onClick={() => setShowResult(!showResult)}>
              {showResult ? (
                <i className="fa fa-chevron-down" aria-hidden="true" />
                ) : (
                <i className="fa fa-chevron-right" aria-hidden="true" />
              )}
            </div>
          </section>
          <section className={`detail ${showResult ? "show" : "hide"}`}>
            <CalculationResult travelRoute={travelRoute} />
          </section>
        </>
      )}
    </section>
  );
};

const ErrorMessage = ({ errorMessage }: { errorMessage: string }) => {
  return <div className="form-error-message">{errorMessage}</div>;
};

export default Calculator;
