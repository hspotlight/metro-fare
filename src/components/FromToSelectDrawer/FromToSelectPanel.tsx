import React, { useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { Grid, IconButton, Paper } from "@material-ui/core";
import SyncAltIcon from "@material-ui/icons/SyncAlt";
import { useTripContext } from "../../contexts/TripProvider";
import { METRO_STATION_ID } from "../../types";
import { useDrawerContext } from "../../contexts/DrawerProvider";
import { FromToButton } from "./FromToButton";
import { FromToSelectDrawer } from "./FromToSelectDrawer";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles(() => ({
  container: {
    bottom: "0px",
    position: "absolute",
    zIndex: 1001,
    height: "50px",
    width: "100%",
  },
  drawer: {
    display: "flex",
    height: "100%",
    alignItems: "center",
  },
  buttonGroup: {
    paddingLeft: "16px",
    paddingRight: "16px",
    paddingTop: "4px",
    paddingBottom: "4px",
    display: "flex",
    width: "100%",
    height: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  fromToContainer: {
    display: "flex",
    justifyContent: "center",
  },
}));

type DrawerType = "from" | "to" | null;

export const FromToSelectPanel = () => {
  const { t: translation } = useTranslation();
  const { trip, setTrip } = useTripContext();
  const { showRouteSearchDrawer, setRouteSearchDrawer } = useDrawerContext();
  const [drawerType, setDrawerType] = useState<DrawerType>(null);
  const classes = useStyles();

  const handleUnselectFrom = () => {
    setTrip("" as METRO_STATION_ID, trip.destination);
  };
  const handleUnselectTo = () => {
    setTrip(trip.source, "" as METRO_STATION_ID);
  };
  const handleSwapLocation = () => {
    setTrip(trip.destination, trip.source);
  };

  const handleFromClick = () => {
    setDrawerType("from");
    setRouteSearchDrawer(true);
  };
  const handleToClick = () => {
    setDrawerType("to");
    setRouteSearchDrawer(true);
  };

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
      <Grid
        container
        className={classes.drawer}
        xs={11}
        justify="space-between"
      >
        <Grid container className={classes.buttonGroup} xs={11}>
          <Grid item xs={6} className={classes.fromToContainer}>
            <FromToButton
              stationId={trip.source}
              handleUnselect={handleUnselectFrom}
              placeHolder={translation("route.from")}
              onClick={handleFromClick}
            />
          </Grid>
          <Grid item xs={6} className={classes.fromToContainer}>
            <FromToButton
              stationId={trip.destination}
              handleUnselect={handleUnselectTo}
              placeHolder={translation("route.to")}
              onClick={handleToClick}
            />
          </Grid>
        </Grid>
        <Grid container xs={1}>
          <IconButton onClick={handleSwapLocation} size="small">
            <SyncAltIcon />
          </IconButton>
        </Grid>
      </Grid>
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
