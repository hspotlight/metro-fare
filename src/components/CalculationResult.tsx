import React, { useContext } from "react";
import { TravelRoute } from "../services/fare.service";
import { getStation, getStationName } from "../services/util.service";
import { LineType } from "../types";
import "../styles/CalculationResult.scss";
import { LanguageContext, Language } from "../contexts/LanguageProvider";
import { Station } from "../data/Stations";

const CalculationResult = (travelRoute: TravelRoute) => {
  const { language } = useContext(LanguageContext);
  return (
    <div>
      <div>Fare: {travelRoute.fare}</div>
      <div className="travel-route-container">
        {travelRoute.route.map((routeSegment, segmentIndex) => {
          let interchangeDottedLine = null;
          if (segmentIndex > 0) {
            interchangeDottedLine = getInterChangeLine(
              routeSegment.lineType,
              travelRoute.route[segmentIndex - 1].lineType
            );
          }
          const route = routeSegment.route.map((stationKey, index) => {
            const dottedLine = getDottedLine(routeSegment.lineType);
            const stationIcon = getStationIcon(routeSegment.lineType);
            const station = getStation(stationKey);
            const stationName = getStationName(station as Station, language as Language);
            if (station?.isNotAvailable) {
              return null;
            }

            return (
              <section key={stationKey}>
                {index > 0 && dottedLine}
                <section className="station-container">
                  {stationIcon}
                  <div>{stationName}</div>
                </section>
              </section>
            );
          });

          return (
            <section key={routeSegment.lineType + "-" + segmentIndex}>
              {interchangeDottedLine}
              {route}
            </section>
          );
        })}
      </div>
    </div>
  );
};

export default CalculationResult;

export const getDottedLine = (currentLineType: LineType) => {
  const dottedLineStyle =
    currentLineType === LineType.MRT_BLUE
      ? "mrt-blue-dotted-line"
      : "bts-silom-dotted-line";
  return <div className={dottedLineStyle}></div>;
};

export const getStationIcon = (currentLineType: LineType) => {
  const iconStyle =
    currentLineType === LineType.MRT_BLUE ? "mrt-blue-icon" : "bts-silom-icon";
  return <div className={iconStyle}></div>;
};

export const getInterChangeLine = (
  currentLineType: LineType,
  prevLineType: LineType
) => {
  if (currentLineType === prevLineType) {
    return getDottedLine(currentLineType);
  } else {
    return <div className="interchange-dotted-line"></div>;
  }
};
