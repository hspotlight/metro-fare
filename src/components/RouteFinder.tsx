import React, { useState, useEffect, useContext, ReactNode } from "react";
import { Button } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { TripContext } from "../contexts/TripProvider";
import NavigationService from "../services/navigation.service";
import SelectedRoute from "./SelectedRoute";
import "../styles/RouteFinder.scss";
import { Journey } from "../types";
import Route from "./Route";
import { EMPTY_STATION_ID, UNFILLED_JOURNEY } from "../common/constants";

const RouteFinder = () => {
  const { t: translate } = useTranslation();
  const { trip, journey, setJourney, resetTrip, resetJourney } = useContext(
    TripContext
  );
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isFormInvalid, setFormInValid] = useState<boolean>(false);

  const [showTripSelector, setShowTripSelector] = useState<boolean>(true);
  const [showAllJourneys, setShowAllJourneys] = useState<boolean>(false);
  const [showSelectedRoute, setShowSelectedRoute] = useState<boolean>(false);

  const [allJourneys, setAllJourneys] = useState<Journey[]>([]);

  const showJourney = journey.route.length > 0 && trip.fromId && trip.toId;

  const calculateRoute = () => {
    let journeys = NavigationService.findAllRoutesWithFare(
      trip.fromId,
      trip.toId
    );
    // sorted and get top 3
    journeys = journeys.sort((a, b) => a.fare - b.fare);
    journeys = journeys.slice(0, 3);

    setAllJourneys(journeys);
    setShowAllJourneys(true);
    setShowSelectedRoute(false);
    setJourney(UNFILLED_JOURNEY); // why reset?
  };

  const resetForm = () => {
    resetJourney();
    resetTrip();
    setErrorMessage("");
    setAllJourneys([]);
    setShowAllJourneys(false);
    setShowSelectedRoute(false);
  };

  useEffect(() => {
    const isFormValid =
      trip.fromId === EMPTY_STATION_ID || trip.toId === EMPTY_STATION_ID;
    setFormInValid(isFormValid);
  }, [trip]);

  return (
    <section className="route-finder-container">
      <Section
        title={translate("tab.search")}
        showDetail={showTripSelector}
        setShowDetail={() => setShowTripSelector(!showTripSelector)}
      >
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
      {allJourneys.length > 0 && (
        <Section
          title={translate("tab.allRoutes", { count: allJourneys.length })}
          showDetail={showAllJourneys}
          setShowDetail={() => setShowAllJourneys(!showAllJourneys)}
        >
          {allJourneys.map((route, index) => {
            const onJourneyClick = () => {
              setJourney(route);
              setShowSelectedRoute(true);
              setShowTripSelector(false);
            };
            return (
              <React.Fragment key={`travel-route-${index}`}>
                {index > 0 && <div className="divider"></div>}
                <Route
                  journey={route}
                  isActive={journey === route}
                  onClick={onJourneyClick}
                />
              </React.Fragment>
            );
          })}
        </Section>
      )}
      {showJourney && (
        <Section
          title={translate("tab.selectedRoute")}
          showDetail={showSelectedRoute}
          setShowDetail={() => setShowSelectedRoute(!showSelectedRoute)}
        >
          <SelectedRoute journey={journey} />
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
