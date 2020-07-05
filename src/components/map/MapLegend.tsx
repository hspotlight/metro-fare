import React from "react";
import { useTranslation } from "react-i18next";
import "../../styles/MapLegend.scss";
import { Checkbox } from "@material-ui/core";
import { MetroLineLayers } from "../MetroMap";

const MapLegend = ({showMetroLineLayers, setShowMetroLayers}: {showMetroLineLayers: MetroLineLayers, setShowMetroLayers: Function}) => {
  const { t: translate } = useTranslation();

  const handleChange = (key: keyof MetroLineLayers) => {
    setShowMetroLayers((prevState: MetroLineLayers) => {
      const newState = {
      ...prevState,
      }
      newState[key] = !newState[key];
      return newState;
    })
  }

  return (
    <div className="map-legend">
      <div className="title">{translate("map.legend.legend")}</div>
      <div className="legend">
        <LegendLabel
          line="mrt-blue-line"
          title={translate("map.legend.mrtBlueLine")}
          status={showMetroLineLayers.mrtBlue}
          onChange={() => handleChange('mrtBlue')}
        />
        <LegendLabel
          line="bts-silom-line"
          title={translate("map.legend.btsSilomLine")}
          status={showMetroLineLayers.btsSilom}
          onChange={() => handleChange('btsSilom')}
        />
        <LegendLabel
          line="bts-sukhumvit-line"
          title={translate("map.legend.btsSukhumvitLine")}
          status={showMetroLineLayers.btsSukhumvit}
          onChange={() => handleChange('btsSukhumvit')}
        />
        <LegendLabel
          line="arl-line"
          title={translate("map.legend.arlLine")}
          status={showMetroLineLayers.arl}
          onChange={() => handleChange('arl')}
        />
      </div>
    </div>
  );
};

const LegendLabel = ({ line, title, status, onChange }: { line: string; title: string, status: boolean, onChange: any }) => {
  return (
    <div className="legend-key-value">
      <Checkbox
        checked={status}
        onChange={onChange}
        name={`key ${line}`}
        color="primary"
      />
      <div className={`key ${line}`}>
        <div className="line"></div>
        <div className="circle"></div>
      </div>
      <div>{title}</div>
    </div>
  );
};

export default MapLegend;
