import React from "react";
import { TravelRoute } from "../types";
import "../styles/RouteInfoCard.scss";
import { getStationKeysFromTravelRoute } from "../services/util.service";
import { useTranslation } from "react-i18next";
type RouteInfoCardProps = {
  travelRoute: TravelRoute;
  title: string;
  onClick: (_: TravelRoute) => void;
};

const RouteInfoCard = ({ travelRoute, title, onClick }: RouteInfoCardProps) => {
  const { t: translate } = useTranslation();
  const numberOfStations = getStationKeysFromTravelRoute(travelRoute).length;
  return (
    <div className="route-info-card" onClick={() => onClick(travelRoute)}>
      <div className="route-info">
        <div className="title">{title}</div>
        <div className="row">
          <div className="col-2">{numberOfStations} {translate("station.station")}</div>
          <div className="col-2">
            {travelRoute.fare} {translate("currency.baht")}
          </div>
        </div>
      </div>
      <div className="next-button">
        <i className="fa fa-chevron-right" aria-hidden="true" />
      </div>
    </div>
  );
};

export default RouteInfoCard;
