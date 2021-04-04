import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Grid, IconButton, Paper, Typography } from "@material-ui/core";
import SyncAltIcon from "@material-ui/icons/SyncAlt";
import CloseIcon from "@material-ui/icons/Close";
import { useTripContext } from "../../contexts/TripProvider";
import { METRO_STATION_ID } from "../../types";
import { useTranslation } from "react-i18next";
import { getStation, getStationName } from "../../services/util.service";

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
  button: {
    width: "70%",
    borderRadius: "0px",
  },
}));

export const RoutingDrawer = () => {
  const { trip, setTrip } = useTripContext();
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
          <Grid item xs={6}>
            <FromToButton
              stationId={trip.source}
              handleUnselect={handleUnselectFrom}
              placeHolder="From"
            />
          </Grid>
          <Grid item xs={6}>
            <FromToButton
              stationId={trip.destination}
              handleUnselect={handleUnselectTo}
              placeHolder="To"
            />
          </Grid>
        </Grid>
        <Grid container xs={1}>
          <IconButton onClick={handleSwapLocation} size="small">
            <SyncAltIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Paper>
  );
};

type FromToButton = {
  stationId: METRO_STATION_ID;
  handleUnselect: () => void;
  placeHolder: string;
};

const FromToButton = ({
  stationId,
  handleUnselect,
  placeHolder,
}: FromToButton) => {
  const { i18n } = useTranslation();
  const classes = useStyles();
  const station = getStation(stationId);
  return (
    <>
      <IconButton className={classes.button} size="small">
        <Typography variant="button" noWrap>
          {station ? getStationName(station, i18n.language) : placeHolder}
        </Typography>
      </IconButton>
      {station && (
        <IconButton onClick={handleUnselect} size="small">
          <CloseIcon />
        </IconButton>
      )}
    </>
  );
};
