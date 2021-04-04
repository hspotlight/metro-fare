import React from "react";
import {
  Drawer,
  Grid,
  IconButton,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import { getStation } from "../../services/util.service";
import { METRO_STATION_ID } from "../../types";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles(() => ({
  drawerRoot: {
    height: "100%",
  },
  sideMenuHeader: {
    display: "flex",
    alignItems: "center",
    minHeight: "56px",
    paddingLeft: "16px",
    paddingRight: "16px",
    marginBottom: "2px",
  },
}));

type RouteDrawer = {
  showRouteSearchDrawer: boolean;
  onClose: (_: boolean) => void;
  stationId: METRO_STATION_ID;
  onSelect: (_: METRO_STATION_ID) => void;
};

export const RouteDrawer = ({
  showRouteSearchDrawer,
  onClose,
  stationId,
  onSelect,
}: RouteDrawer) => {
  const classes = useStyles();
  const station = getStation(stationId);
  return (
    <Drawer
      anchor={"bottom"}
      open={showRouteSearchDrawer}
      onClose={onClose}
      classes={{
        paper: classes.drawerRoot,
      }}
    >
      <Paper className={classes.sideMenuHeader}>
        <Grid container justify="space-between" alignItems="center">
          <Typography variant="h6">{stationId}</Typography>
          <IconButton onClick={() => onClose(false)}>
            <CloseIcon />
          </IconButton>
        </Grid>
      </Paper>
    </Drawer>
  );
};
