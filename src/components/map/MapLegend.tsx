import React from "react";
import { useTranslation } from "react-i18next";
import "../../styles/MapLegend.scss";

const MapLegend = () => {
  const { t: translate } = useTranslation();
  return (
    <div className="map-legend">
      <div className="title">{translate("map.legend.legend")}</div>
      <div className="legend">
        <LegendLabel
          line="mrt-blue-line"
          title={translate("map.legend.mrtBlueLine")}
        />
        <LegendLabel
          line="bts-silom-line"
          title={translate("map.legend.btsSilomLine")}
        />
        <LegendLabel
          line="bts-sukhumvit-line"
          title={translate("map.legend.btsSukhumvitLine")}
        />
      </div>
    </div>
  );
};

const LegendLabel = ({ line, title }: { line: string; title: string }) => {
  return (
    <div className="legend-key-value">
      <div className={`key ${line}`}>
        <div className="line"></div>
        <div className="circle"></div>
      </div>
      <div>{title}</div>
    </div>
  );
};

export default MapLegend;
