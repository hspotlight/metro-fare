import React from "react";
import { getStation, getStationName } from "../services/util.service";
import { LineType, TravelRoute, Station } from "../types";
import "../styles/CalculationResult.scss";
import { useTranslation } from "react-i18next";

const CalculationResult = ({travelRoute}: {travelRoute: TravelRoute}) => {
  const {t: translate, i18n } = useTranslation();
  return (
    <div>
      <div>{translate('route.fare')}: {travelRoute.fare}</div>
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
            const station = getStation(stationKey) as Station;
            const dottedLineStyle = getDottedLineStyle(station.lineType);
            const stationIconStyle = getStationIconStyle(station.lineType);
            if (station.isNotAvailable) {
              return null;
            }

            const stationName = `(${station.key}) ${getStationName(station as Station, i18n.language)}`;

            return (
              <section key={stationKey}>
                {index > 0 && <div className={dottedLineStyle}></div>}
                <section className="station-container">
                  {<div className={stationIconStyle}></div>}
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

export const getDottedLineStyle = (currentLineType: LineType) => {
  switch(currentLineType) {
    case LineType.MRT_BLUE: return "mrt-blue-dotted-line";
    case LineType.BTS_SILOM: return "bts-silom-dotted-line";
    case LineType.BTS_SUKHUMVIT: return "bts-sukhumvit-dotted-line";
    default: return "bts-silom-dotted-line";
  }
};

export const getStationIconStyle = (currentLineType: LineType) => {
  switch(currentLineType) {
    case LineType.MRT_BLUE: return "mrt-blue-icon";
    case LineType.BTS_SILOM: return "bts-silom-icon";
    case LineType.BTS_SUKHUMVIT: return "bts-sukhumvit-icon";
    default: return "bts-silom-icon";
  }
};

export const getInterChangeLine = (
  currentLineType: LineType,
  prevLineType: LineType
) => {
  if (currentLineType === prevLineType) {
    const style = getDottedLineStyle(currentLineType);
    return <div className={style}></div>;
  } else {
    if (
      (currentLineType === LineType.BTS && prevLineType === LineType.BTS_SILOM) ||
      (currentLineType === LineType.BTS_SILOM && prevLineType === LineType.BTS)) {
      const style = getDottedLineStyle(LineType.BTS_SILOM);
      return <div className={style}></div>;
    }
    if (
      (currentLineType === LineType.BTS && prevLineType === LineType.BTS_SUKHUMVIT) ||
      (currentLineType === LineType.BTS_SUKHUMVIT && prevLineType === LineType.BTS)) {
      const style = getDottedLineStyle(LineType.BTS_SUKHUMVIT);
      return <div className={style}></div>;
    }
    return <div className="interchange-dotted-line"></div>;
  }
};
