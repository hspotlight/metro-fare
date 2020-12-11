import React, { useState, useEffect, useContext, ReactNode } from "react";
import { Button } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { TripContext, emptyTravelRoute } from "../contexts/TripProvider";
import FareService from "../services/fare.service";
import StationSelect from "./StationSelect";
import SelectedRoute from "./SelectedRoute";
import "../styles/RouteFinder.scss";
import { TravelRoute } from "../types";
import Route from "./Route";

const RouteFinder = () => {
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

  const [showTripSelector, setShowTripSelector] = useState<boolean>(true);
  const [showAllTravelRoutes, setShowAllTravelRoutes] = useState<boolean>(false);
  const [showSelectedRoute, setShowSelectedRoute] = useState<boolean>(false);

  const [allTravelRoutes, setAllTravelRoutes] = useState<TravelRoute[]>([]);

  const showTravelRoute =
    travelRoute.route.length > 0 && trip.source && trip.destination;

  const calculateRoute = () => {
    let travelRoutes = FareService.findAllRoutes(trip.source, trip.destination);
    // sorted and get top 3
    travelRoutes = travelRoutes.sort((a, b) => a.fare - b.fare);
    travelRoutes = travelRoutes.slice(0, 3);

    setAllTravelRoutes(travelRoutes);
    setShowAllTravelRoutes(true);
    setShowSelectedRoute(false);
    setTravelRoute(emptyTravelRoute); // why reset?
  };

  const resetForm = () => {
    resetTravelRoute();
    resetTrip();
    setErrorMessage("");
    setAllTravelRoutes([]);
    setShowAllTravelRoutes(false);
    setShowSelectedRoute(false);
  };

  useEffect(() => {
    const isFormValid =
      trip.source.length === 0 || trip.destination.length === 0;
    setFormInValid(isFormValid);
  }, [trip]);

  return (
    <section className="route-finder-container">
      <Section
        title={translate("tab.search")}
        showDetail={showTripSelector}
        setShowDetail={() => setShowTripSelector(!showTripSelector)}
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
      {allTravelRoutes.length > 0 && (
        <Section
          title={translate("tab.allRoutes", {count: allTravelRoutes.length})}
          showDetail={showAllTravelRoutes}
          setShowDetail={() => setShowAllTravelRoutes(!showAllTravelRoutes)}
        >
          {allTravelRoutes.map((route, index) => {
            const onTravelRouteClick = () => {
              setTravelRoute(route);
              setShowSelectedRoute(true);
              setShowTripSelector(false);
            }
            return (
              <React.Fragment key={`travel-route-${index}`}>
                {index > 0 && <div className="divider"></div>}
                <Route
                  travelRoute={route}
                  isActive={travelRoute === route}
                  onClick={onTravelRouteClick}
                />
              </React.Fragment>
            );
          })}
          
        </Section>
      )}
      {showTravelRoute && (
        <Section
          title={translate("tab.selectedRoute")}
          showDetail={showSelectedRoute}
          setShowDetail={() => setShowSelectedRoute(!showSelectedRoute)}
        >
          <SelectedRoute travelRoute={travelRoute} />
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

export default RouteFinder;
