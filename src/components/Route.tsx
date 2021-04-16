import React from "react";
import { Journey, Station, LineType } from "../types";
import { useTranslation } from "react-i18next";
import {
  getStation,
  getStationIdsFromJourney,
  getStationName,
} from "../services/util.service";
import "../styles/Route.scss";
import { getStationIconStyle } from "../services/ui-style.service";

type RouteProps = {
  journey: Journey;
  onClick: any;
  isActive: boolean;
};

const Route = ({ journey, onClick, isActive }: RouteProps) => {
  const { t: translate } = useTranslation();
  const fromStation = getStation(journey.from);
  const toStation = getStation(journey.to);

  const stationIds = getStationIdsFromJourney(journey);

  const intermediateStationCount =
    fromStation?.id === toStation?.id ? 0 : stationIds.length - 2;

  return (
    <div
      className={`route-block-container ${isActive ? "active" : ""}`}
      onClick={onClick}
    >
      <div className="route-container">
        <StationBlock station={fromStation as Station} />
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
        <StationBlock station={toStation as Station} />
      </div>
      <div className="fare-container">
        {`${journey.fare} ${translate("priceSymbol.baht")}`}
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
      <div>{`(${station.id}) ${stationName}`}</div>
    </section>
  );
};

export default Route;
