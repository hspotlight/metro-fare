import React, { useState } from "react";
import Control from "react-leaflet-control";
import MapLegend from "./MapLegend";
import "../../styles/MapControl.scss";

const MapControl = (props: any) => {
  const [legendToggleStatus, setLegendToggleStatus] = useState(false);
  const { onResetViewClick } = props;
  return (
    <>
      <Control {...props}>
        <div className="map-control">
          <img className="control-icon control-icon-top" src="home.png" alt="Reset View Button" onClick={onResetViewClick}/>
          <img className="control-icon control-icon-bottom" src="info.png" alt="Map Legend" onClick={() => setLegendToggleStatus(!legendToggleStatus)}/>
        </div>
        {legendToggleStatus && <MapLegend />}
      </Control>
    </>
  );
};

export default MapControl;
