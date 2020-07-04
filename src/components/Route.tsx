import React from "react";
import { Trip } from "../contexts/TripProvider";
import { TravelRoute, Station, LineType } from "../types";
import { useTranslation } from "react-i18next";
import {
  getStation,
  getStationName,
  getStationsCount,
} from "../services/util.service";
import { getStationIconStyle } from "./CalculationResult";
import "../styles/Route.scss";

const Route = ({
  trip,
  route,
  onClick,
}: {
  trip: Trip;
  route: TravelRoute;
  onClick: any;
}) => {
  const { t: translate } = useTranslation();
  const sourceStation = getStation(trip.source);
  const destinationStation = getStation(trip.destination);

  const intermediateStationCount =
    trip.source === trip.destination ? 0 : getStationsCount(route) - 2;

  return (
    <div onClick={onClick} style={{ display: "flex" }}>
      <div className="route-container">
        <StationBLock station={sourceStation as Station} />
        <section className="intermediate-station section">
          <div className="interchange-dotted-line"></div>
          {intermediateStationCount > 0 && (
            <div className="display-text">
              {translate("route.intermediateStationText", {
                count: intermediateStationCount,
              })}
            </div>
          )}
        </section>
        <StationBLock station={destinationStation as Station} />
      </div>
      <div className="fare-container">
        {`${route.fare} ${translate("priceSymbol.baht")}`}
      </div>
    </div>
  );
};

const StationBLock = ({ station }: { station: Station }) => {
  const { i18n } = useTranslation();
  const stationName = getStationName(station, i18n.language);
  const stationIconStyle = getStationIconStyle(station.lineType as LineType);
  return (
    <section className="station-container">
      {<div className={stationIconStyle}></div>}
      <div>{`(${station.key}) ${stationName}`}</div>
    </section>
  );
};

export default Route;
