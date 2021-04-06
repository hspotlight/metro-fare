import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, IconButton } from "@material-ui/core";
import SyncAltIcon from "@material-ui/icons/SyncAlt";
import { useTripContext } from "../../contexts/TripProvider";
import { METRO_STATION_ID } from "../../types";
import { useDrawerContext } from "../../contexts/DrawerProvider";
import { FromToButton } from "./FromToButton";
import { useTranslation } from "react-i18next";
import { DrawerType } from "./FromToSelectPanel";

const useStyles = makeStyles(() => ({
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

type FromToSelectProps = {
  setDrawerType: (_: DrawerType) => void;
};

export const FromToSelect = ({ setDrawerType }: FromToSelectProps) => {
  const classes = useStyles();
  const { t: translation } = useTranslation();
  const { trip, setTrip } = useTripContext();
  const { setRouteSearchDrawer } = useDrawerContext();

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

  return (
    <Grid
      container
      className={classes.drawer}
      item
      xs={11}
      justify="space-between"
    >
      <Grid container className={classes.buttonGroup} item xs={11}>
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
      <Grid container item xs={1}>
        <IconButton onClick={handleSwapLocation} size="small">
          <SyncAltIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
};
