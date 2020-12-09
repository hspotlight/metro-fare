import React from "react";
import { useTranslation } from "react-i18next";
import { getLineTypeLabel, getStation, getStationName } from "../services/util.service";
import { METRO_STATION } from "../types";
import "../styles/RouteFromTo.scss";

type RouteFromToProps = {
  departure: METRO_STATION;
  arrival: METRO_STATION;
};

const RouteFromTo = ({
  departure,
  arrival,
}: RouteFromToProps) => {
  const { i18n } = useTranslation();
  const departureStation = getStation(departure);
  const arrivalStation = getStation(arrival);
  if (!departureStation || !arrivalStation) return null;

  const departureStationName = `${getLineTypeLabel(departureStation.lineType)} ${getStationName(departureStation, i18n.language)}`;
  const arrivalStationName = `${getLineTypeLabel(arrivalStation.lineType)} ${getStationName(arrivalStation, i18n.language)}`;
  return (
    <div className="route-from-to">
      <div className="station">{departureStationName}</div>
      <div className="arrow"><i className="fa fa-chevron-right" aria-hidden="true" /></div>
      <div className="station">{arrivalStationName}</div>
    </div>
  );
};

export default RouteFromTo;
