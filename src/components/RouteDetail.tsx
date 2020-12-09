import React from "react";
import { useTripContext } from "../contexts/TripProvider";
import RouteDetailInsight from "./RouteDetailInsight";
import RouteFromTo from "./RouteFromTo";
import SelectedRoute from "./SelectedRoute";
import '../styles/RouteDetail.scss';

const RouteDetail = () => {
  const { travelRoute } = useTripContext();

  return (
    <div className="route-detail">
      <RouteFromTo
        departure={travelRoute.source}
        arrival={travelRoute.destination}
      />
      <RouteDetailInsight nStations={5} fare={10} />

      <div className="selected-route">
        <SelectedRoute travelRoute={travelRoute} />
      </div>
    </div>
  );
};

export default RouteDetail;
