import React, { useState } from "react";
import Control from "react-leaflet-control";
import MapLegend from "./MapLegend";
import "../../styles/MapControl.scss";
import { useTranslation } from "react-i18next";
import LayersIcon from "@material-ui/icons/Layers";
import TranslateIcon from "@material-ui/icons/Translate";
import { IconButton, makeStyles, Paper } from "@material-ui/core";

const useStyle = makeStyles(() => ({
  iconRoot: {
    color: "#000000",
    padding: "3px",
    borderRadius: "0px",
  },
}));

const MapControl = (props: any) => {
  const classes = useStyle();
  const { i18n } = useTranslation();
  const [legendToggleStatus, setLegendToggleStatus] = useState(false);
  // TODO: check if we need reset view feature
  // const { onResetViewClick } = props;

  const toggleLanguage = i18n.language === "th" ? "en" : "th";

  return (
    <>
      <Control {...props}>
        <Paper className="map-control">
          <IconButton
            classes={{ root: classes.iconRoot }}
            onClick={() => setLegendToggleStatus(!legendToggleStatus)}
          >
            <LayersIcon />
          </IconButton>
          <IconButton
            classes={{ root: classes.iconRoot }}
            onClick={() => i18n.changeLanguage(toggleLanguage)}
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
