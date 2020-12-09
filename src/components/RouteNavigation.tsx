import { Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useTripContext } from "../contexts/TripProvider";
import "../styles/RouteNavigation.scss";
import StationSelectInput from "./StationSelectInput";

const RouteNavigation = () => {
  const { t: translate } = useTranslation();
  const [isFormInvalid, setFormInValid] = useState<boolean>(false);
  const { trip, setSource, setDestination, resetTrip } = useTripContext();

  useEffect(() => {
    const isFormValid =
      trip.source.length === 0 || trip.destination.length === 0;
    setFormInValid(isFormValid);
  }, [trip]);

  const navigateToRoutesPage = () => {
    console.log("navigate to Routes page");
  };

  return (
    <div className="route-navigation">
      <div className="logo-container">
        <img height="100" width="100" src="metro-fare-logo.jpg" alt="Metro Fare logo" />
      </div>
      <div>
        <StationSelectInput
          title={translate("route.source")}
          value={trip.source}
          onClick={setSource}
        />
        <StationSelectInput
          title={translate("route.destination")}
          value={trip.destination}
          onClick={setDestination}
        />
      </div>

      <div className="action-button-group">
        <Button variant="contained" color="secondary" onClick={resetTrip}>
          {translate("common.reset")}
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={navigateToRoutesPage}
          style={{ marginLeft: "20px" }}
          disabled={isFormInvalid}
        >
          {translate("common.search")}
        </Button>
      </div>
    </div>
  );
};

export default RouteNavigation;
