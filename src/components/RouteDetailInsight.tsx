import React from "react";
import { useTranslation } from "react-i18next";
import "../styles/RouteDetailInsight.scss";

type RouteDetailInsightProps = {
  nStations: number;
  fare: number;
};

export const RouteDetailInsight = ({
  nStations,
  fare,
}: RouteDetailInsightProps) => {
  const { t: translate } = useTranslation();
  return (
    <div className="route-detail-insight">
      <div className="row">
        <div className="col-2">{translate("station.totalStation")}</div>
        <div className="col-2">{translate("station.totalFare")}</div>
      </div>
      <div className="row">
        <div className="col-2">
          {nStations} {translate("station.station")}
        </div>
        <div className="col-2">
          {fare} {translate("currency.baht")}
        </div>
      </div>
    </div>
  );
};

export default RouteDetailInsight;
