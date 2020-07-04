import React, { useState, useEffect, useContext, ReactNode } from "react";
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

  const showTravelRoute =
    travelRoute.route.length > 0 && trip.source && trip.destination;
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
      <Section
        title={translate("tab.search")}
        showDetail={showCalculator}
        setShowDetail={() => setShowCalculator(!showCalculator)}
      >
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
      </Section>
      {showTravelRoute && (
        <Section
          title={translate("tab.result")}
          showDetail={showResult}
          setShowDetail={() => setShowResult(!showResult)}
        >
          <CalculationResult travelRoute={travelRoute} />
        </Section>
      )}
    </section>
  );
};

type SectionProps = {
  title: string;
  showDetail: boolean;
  setShowDetail: any;
  children: ReactNode;
};

const Section = ({
  title,
  showDetail,
  setShowDetail,
  children,
}: SectionProps) => {
  return (
    <>
      <section className="header">
        <div>{title}</div>
        <div className="chevron-icon-container" onClick={setShowDetail}>
          {showDetail ? (
            <i className="fa fa-chevron-down" aria-hidden="true" />
          ) : (
            <i className="fa fa-chevron-right" aria-hidden="true" />
          )}
        </div>
      </section>
      <section className={`detail ${showDetail ? "show" : "hide"}`}>
        {children}
      </section>
    </>
  );
};

const ErrorMessage = ({ errorMessage }: { errorMessage: string }) => {
  return <div className="form-error-message">{errorMessage}</div>;
};

export default Calculator;
