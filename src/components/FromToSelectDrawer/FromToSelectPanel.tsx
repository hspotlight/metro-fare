import React, { useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { Paper } from "@material-ui/core";
import { useTripContext } from "../../contexts/TripProvider";
import { METRO_STATION_ID } from "../../types";
import { useDrawerContext } from "../../contexts/DrawerProvider";
import { FromToSelectDrawer } from "./FromToSelectDrawer";
import { useTranslation } from "react-i18next";
import { FromToSelect } from "./FromToSelect";

const useStyles = makeStyles(() => ({
  container: {
    bottom: "0px",
    position: "absolute",
    zIndex: 1001,
    height: "50px",
    width: "100%",
  },
}));

export type DrawerType = "from" | "to" | null;

export const FromToSelectPanel = () => {
  const { t: translation } = useTranslation();
  const { trip, setTrip } = useTripContext();
  const { showRouteSearchDrawer, setRouteSearchDrawer } = useDrawerContext();
  const [drawerType, setDrawerType] = useState<DrawerType>(null);
  const classes = useStyles();

  const handleDrawerClose = () => {
    setDrawerType(null);
    setRouteSearchDrawer(false);
  };

  const onSelectStation = (station: METRO_STATION_ID) => {
    if (drawerType === "from") {
      setTrip(station, trip.destination);
    } else {
      setTrip(trip.source, station);
    }
    handleDrawerClose();
  };

  return (
    <Paper
      classes={{
        root: classes.container,
      }}
    >
      <FromToSelect setDrawerType={setDrawerType} />
      {drawerType && (
        <FromToSelectDrawer
          showRouteSearchDrawer={showRouteSearchDrawer}
          onClose={handleDrawerClose}
          stationId={drawerType === "from" ? trip.source : trip.destination}
          onSelect={onSelectStation}
          placeHolder={
            drawerType === "from"
              ? translation("route.from")
              : translation("route.to")
          }
        />
      )}
    </Paper>
  );
};
