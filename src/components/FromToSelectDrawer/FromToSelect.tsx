import React from "react";
import makeStyles from '@material-ui/styles/makeStyles';
import { Grid, IconButton } from "@material-ui/core";
import SyncAltIcon from "@material-ui/icons/SyncAlt";
import { useTripContext } from "../../contexts/TripProvider";
import { useDrawerContext } from "../../contexts/DrawerProvider";
import { FromToButton } from "./FromToButton";
import { useTranslation } from "react-i18next";
import { DrawerType } from "./FromToSelectPanel";
import { EMPTY_STATION_ID } from "../../common/constants";

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
    setTrip(EMPTY_STATION_ID, trip.toId);
  };
  const handleUnselectTo = () => {
    setTrip(trip.fromId, EMPTY_STATION_ID);
  };
  const handleSwapLocation = () => {
    setTrip(trip.toId, trip.fromId);
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
      justifyContent="space-between"
    >
      <Grid container className={classes.buttonGroup} item xs={11}>
        <Grid item xs={6} className={classes.fromToContainer}>
          <FromToButton
            stationId={trip.fromId}
            handleUnselect={handleUnselectFrom}
            placeHolder={translation("route.from")}
            onClick={handleFromClick}
          />
        </Grid>
        <Grid item xs={6} className={classes.fromToContainer}>
          <FromToButton
            stationId={trip.toId}
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
