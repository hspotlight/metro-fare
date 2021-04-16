import React from "react";
import { useTranslation } from "react-i18next";
import {
  getLineTypeLabel,
  getStation,
  getStationName,
} from "../services/util.service";
import { METRO_STATION_ID } from "../types";
import { Grid, makeStyles, Paper, Typography } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  paper: {
    padding: "12px",
    margin: "12px",
  },
}));

type RouteFromToProps = {
  from: METRO_STATION_ID;
  to: METRO_STATION_ID;
};

const RouteFromTo = ({ from, to }: RouteFromToProps) => {
  const classes = useStyles();
  const { t: translate, i18n } = useTranslation();
  const fromStation = getStation(from);
  const toStation = getStation(to);
  if (!fromStation || !toStation) return null;

  const fromStationName = `${getLineTypeLabel(
    fromStation.lineType
  )} ${getStationName(fromStation, i18n.language)}`;

  const toStationName = `${getLineTypeLabel(
    toStation.lineType
  )} ${getStationName(toStation, i18n.language)}`;

  return (
    <Paper className={classes.paper}>
      <Grid container alignItems="center">
        <Grid container>
          <Grid xs={2}>
            <Typography variant="h6">{translate("station.from")}</Typography>
          </Grid>
          <Grid xs={10}>
            <Typography variant="h6">: {fromStationName}</Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid xs={2}>
            <Typography variant="h6">{translate("station.to")}</Typography>
          </Grid>
          <Grid xs={10}>
            <Typography variant="h6">: {toStationName}</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default RouteFromTo;
