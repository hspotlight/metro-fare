import React from "react";
import { TravelRoute, Station, LineType } from "../types";
import { useTranslation } from "react-i18next";
import {
  getStation,
  getStationName,
  getStationsCount,
} from "../services/util.service";
import "../styles/Route.scss";
import { getStationIconStyle } from "../services/ui-style.service";

const Route = ({
  travelRoute,
  onClick,
  isActive,
}: {
  travelRoute: TravelRoute;
  onClick: any;
  isActive: boolean
}) => {
  const { t: translate } = useTranslation();
  const sourceStation = getStation(travelRoute.source);
  const destinationStation = getStation(travelRoute.destination);

  const intermediateStationCount =
  sourceStation?.key === destinationStation?.key ? 0 : getStationsCount(travelRoute) - 2;

  return (
    <div className={`route-block-container ${isActive ? "active": ""}`} onClick={onClick}>
      <div className="route-container">
        <StationBlock station={sourceStation as Station} />
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
        <StationBlock station={destinationStation as Station} />
      </div>
      <div className="fare-container">
        {`${travelRoute.fare} ${translate("priceSymbol.baht")}`}
      </div>
    </div>
  );
};

const StationBlock = ({ station }: { station: Station }) => {
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
