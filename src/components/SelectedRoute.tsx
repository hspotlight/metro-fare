import React from "react";
import { getStation, getStationName } from "../services/util.service";
import { Journey, Station } from "../types";
import "../styles/SelectedRoute.scss";
import { useTranslation } from "react-i18next";
import {
  getDottedLineStyle,
  getStationIconStyle,
  getInterChangeLine,
} from "../services/ui-style.service";

const SelectedRoute = ({ journey }: { journey: Journey }) => {
  const { i18n } = useTranslation();
  return (
    <div>
      <div className="travel-route-container">
        {journey.route.map((routeSegment, segmentIndex) => {
          let interchangeDottedLineStyle = "";
          if (segmentIndex > 0) {
            interchangeDottedLineStyle = getInterChangeLine(
              routeSegment.lineType,
              journey.route[segmentIndex - 1].lineType
            );
          }
          const route = routeSegment.route.map((stationId, index) => {
            const station = getStation(stationId) as Station;
            const dottedLineStyle = getDottedLineStyle(station.lineType);
            const stationIconStyle = getStationIconStyle(station.lineType);
            if (station.isNotAvailable) {
              return null;
            }

            const stationName = `(${station.id}) ${getStationName(
              station as Station,
              i18n.language
            )}`;

            return (
              <section key={stationId}>
                {index > 0 && (
                  <div className={"dotted-line " + dottedLineStyle}></div>
                )}
                <section className="station-container">
                  {<div className={"station-icon " + stationIconStyle}></div>}
                  <div>{stationName}</div>
                </section>
              </section>
            );
          });

          return (
            <section key={routeSegment.lineType + "-" + segmentIndex}>
              {<div className={interchangeDottedLineStyle}></div>}
              {route}
            </section>
          );
        })}
      </div>
    </div>
  );
};

export default SelectedRoute;
