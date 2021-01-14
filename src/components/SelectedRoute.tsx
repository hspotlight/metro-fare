import React from "react";
import { getStation, getStationName } from "../services/util.service";
import { TravelRoute, Station } from "../types";
import "../styles/SelectedRoute.scss";
import { useTranslation } from "react-i18next";
import { getDottedLineStyle, getStationIconStyle, getInterChangeLine } from "../services/ui-style.service";

const SelectedRoute = ({travelRoute}: {travelRoute: TravelRoute}) => {
  const {t: translate, i18n } = useTranslation();
  return (
    <div>
      <div data-testid="selected-route-fare" >{translate('route.fare')}: {travelRoute.fare}</div>
      <div data-testid="selected-route-container" className="travel-route-container">
        {travelRoute.route.map((routeSegment, segmentIndex) => {
          let interchangeDottedLineStyle = "";
          if (segmentIndex > 0) {
            interchangeDottedLineStyle = getInterChangeLine(
              routeSegment.lineType,
              travelRoute.route[segmentIndex - 1].lineType
            );
          }
          const route = routeSegment.route.map((stationKey, index) => {
            const station = getStation(stationKey) as Station;
            const dottedLineStyle = getDottedLineStyle(station.lineType);
            const stationIconStyle = getStationIconStyle(station.lineType);
            if (station.isNotAvailable) {
              return null;
            }

            const stationName = `(${station.key}) ${getStationName(station as Station, i18n.language)}`;
            return (
              <section data-testid="selected-route-station" key={stationKey}>
                {index > 0 && <div data-testid="selected-route-station-dotted-line-style" className={dottedLineStyle}></div>}
                <section className="station-container">
                  <div data-testid="selected-route-station-icon-style" className={stationIconStyle}></div>
                  <div data-testid="selected-route-station-name">{stationName}</div>
                </section>
              </section>
            );
          });

          return (
            <section key={routeSegment.lineType + "-" + segmentIndex}>
              <div data-testid="selected-route-interchange-dotted-line-style" className={interchangeDottedLineStyle}></div>
              {route}
            </section>
          );
        })}
      </div>
    </div>
  );
};

export default SelectedRoute;
