import { makeStyles } from "@material-ui/styles";
import { divIcon, LatLngTuple } from "leaflet";
import React from "react";
import { Marker } from "react-leaflet";

const useStyle = makeStyles(() => ({
  markerLayout: {
    marginTop: "-30px !important",
    marginLeft: "-13px !important",
    fontSize: "35px",
  },
  red: {
    color: "red",
  },
  blue: {
    color: "blue",
  },
}));

const FromToMarker = ({
  position,
  type,
}: {
  position: LatLngTuple;
  type: "from" | "to";
}) => {
  const classes = useStyle();
  const color = type === "from" ? classes.blue : classes.red;
  const fromIcon = divIcon({
    className: `fas fa-map-marker-alt ${classes.markerLayout} ${color}`,
  });
  return <Marker position={position} icon={fromIcon} />;
};

export default FromToMarker;
