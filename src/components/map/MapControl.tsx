import React, { useState } from "react";
import Control from "react-leaflet-control";
import MapLegend from "./MapLegend";
import "../../styles/MapControl.scss";
import { useTranslation } from "react-i18next";
import LayersIcon from "@material-ui/icons/Layers";
import TranslateIcon from "@material-ui/icons/Translate";
import { IconButton, Paper } from "@material-ui/core";

const butonStyle = { color: "black", padding: "8px", borderRadius: "0px" };

const MapControl = (props: any) => {
  const { i18n, t: translation } = useTranslation();
  const [legendToggleStatus, setLegendToggleStatus] = useState(false);
  // TODO: check if we need reset view feature
  // const { onResetViewClick } = props;

  const toggleLanguage = i18n.language === "th" ? "en" : "th";

  return (
    <>
      <Control {...props}>
        <Paper className="map-control">
          <IconButton
            aria-label={translation("common.toggleStatus")}
            onClick={() => setLegendToggleStatus(!legendToggleStatus)}
            style={butonStyle}
          >
            <LayersIcon />
          </IconButton>
          <IconButton
            aria-label={translation("common.changeLanguage")}
            onClick={() => i18n.changeLanguage(toggleLanguage)}
            style={butonStyle}
          >
            <TranslateIcon />
          </IconButton>
          {legendToggleStatus && <MapLegend />}
        </Paper>
      </Control>
    </>
  );
};

export default MapControl;
