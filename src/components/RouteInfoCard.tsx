import React from "react";
import { Journey } from "../types";
import "../styles/RouteInfoCard.scss";
import { getStationIdsFromJourney } from "../services/util.service";
import { useTranslation } from "react-i18next";
type RouteInfoCardProps = {
  journey: Journey;
  title: string;
  onClick: () => void;
};

const RouteInfoCard = ({ journey, title, onClick }: RouteInfoCardProps) => {
  const { t: translate } = useTranslation();
  const numberOfStations = getStationIdsFromJourney(journey).length;
  return (
    <div className="route-info-card" onClick={onClick}>
      <div className="route-info">
        <div className="title">{title}</div>
        <div className="row">
          <div className="col-2">{numberOfStations} {translate("station.station")}</div>
          <div className="col-2">
            {journey.fare} {translate("currency.baht")}
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
