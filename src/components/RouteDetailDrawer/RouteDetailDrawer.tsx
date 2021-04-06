import React from "react";
import { Drawer, Grid, IconButton, makeStyles, Paper } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { Journey } from "../../types";
import { useTranslation } from "react-i18next";
import SelectedRoute from "../SelectedRoute";
import RouteFromTo from "../RouteFromTo";
import RouteDetailInsight from "../RouteDetailInsight";
import { getStationIdsFromJourney } from "../../services/util.service";

const useStyles = makeStyles(() => ({
  drawerRoot: {
    height: "100%",
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    minHeight: "56px",
    marginBottom: "2px",
    position: "fixed",
    top: "0",
    width: "100%",
    zIndex: 1000,
  },
  paddingVertical16px: {
    paddingLeft: "16px",
    paddingRight: "16px",
  },
  drawerContent: {
    paddingTop: "56px",
  },
}));

type RouteDetailDrawerProps = {
  showRouteDetailDrawer: boolean;
  onClose: (_: boolean) => void;
  routeNumber: number;
  journey: Journey;
};

export const RouteDetailDrawer = ({
  showRouteDetailDrawer,
  onClose,
  routeNumber,
  journey,
}: RouteDetailDrawerProps) => {
  const classes = useStyles();
  const { t: translation } = useTranslation();
  const nStations = getStationIdsFromJourney(journey).length;
  return (
    <Drawer
      anchor={"bottom"}
      open={showRouteDetailDrawer}
      onClose={onClose}
      classes={{
        paper: classes.drawerRoot,
      }}
    >
      <Paper className={classes.drawerHeader}>
        <Grid
          container
          justify="space-between"
          alignItems="center"
          className={classes.paddingVertical16px}
        >
          <Grid item>
            {translation("route.route")} {routeNumber}
          </Grid>
          <Grid item>
            <IconButton onClick={() => onClose(false)}>
              <CloseIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Paper>
      <Grid className={classes.drawerContent} container direction="column">
        <RouteFromTo departure={journey.from} arrival={journey.to} />
        <RouteDetailInsight nStations={nStations} fare={journey.fare} />
        <Grid item className={classes.paddingVertical16px}>
          <SelectedRoute journey={journey} />
        </Grid>
      </Grid>
    </Drawer>
  );
};
