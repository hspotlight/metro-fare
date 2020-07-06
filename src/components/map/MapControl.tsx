import React, { useState } from "react";
import Control from "react-leaflet-control";
import MapLegend from "./MapLegend";
import "../../styles/MapControl.scss";
import { useTranslation } from "react-i18next";

const MapControl = (props: any) => {
  const { i18n } = useTranslation();
  const [legendToggleStatus, setLegendToggleStatus] = useState(false);
  const { onResetViewClick } = props;

  const toggleLanguage = i18n.language === "th" ? "en" : "th";

  return (
    <>
      <Control {...props}>
        <div className="map-control">
          <i className="fas fa-home control-icon control-icon-top" aria-hidden="true" onClick={onResetViewClick}/>
          <i className="fas fa-layer-group control-icon control-icon-middle" aria-hidden="true" onClick={() => setLegendToggleStatus(!legendToggleStatus)}/>
          <i className="fa fa-language control-icon control-icon-bottom" aria-hidden="true" onClick={() => i18n.changeLanguage(toggleLanguage)}/>
          {legendToggleStatus && <MapLegend/>}
        </div>
      </Control>
    </>
  );
};

export default MapControl;
