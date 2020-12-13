import { Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useTripContext } from "../contexts/TripProvider";
import "../styles/RouteNavigation.scss";
import StationSelectInput from "./StationSelectInput";
import { Link, useHistory } from "react-router-dom";

const RouteNavigation = () => {
  const { t: translate } = useTranslation();
  const [isFormInvalid, setFormInValid] = useState<boolean>(false);
  const { trip, resetTrip } = useTripContext();
  const history = useHistory()

  useEffect(() => {
    const isFormValid =
      trip.source.length === 0 || trip.destination.length === 0;
    setFormInValid(isFormValid);
  }, [trip]);

  const handleOnFocus = (selectStationType: 'source' | 'destination') => {
    history.push(`/select-station/${selectStationType}`)
  }

  return (
    <div className="route-navigation">
      <div className="logo-container">
        <img
          height="100"
          width="100"
          src="metro-fare-logo.jpg"
          alt="Metro Fare logo"
        />
      </div>
      <div>
        <StationSelectInput
          title={translate("route.source")}
          value={trip.source}
          onFocus={() => handleOnFocus('source')}
        />
        <StationSelectInput
          title={translate("route.destination")}
          value={trip.destination}
          onFocus={() => handleOnFocus('destination')}
        />
      </div>

      <div className="action-button-group">
        <Button variant="contained" color="secondary" onClick={resetTrip}>
          {translate("common.reset")}
        </Button>

        {isFormInvalid ? (
          <Button
            variant="contained"
            color="primary"
            style={{ marginLeft: "20px" }}
            disabled={true}
          >
            {translate("common.search")}
          </Button>
        ) : (
          <Link to={`/routes?source=${trip.source}&destination=${trip.destination}`}>
            <Button
              variant="contained"
              color="primary"
              style={{ marginLeft: "20px" }}
              disabled={false}
            >
              {translate("common.search")}
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default RouteNavigation;
