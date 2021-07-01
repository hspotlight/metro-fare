import React, { useEffect, useState } from "react";
import { Drawer, Grid, IconButton, Paper, TextField } from "@material-ui/core";

import makeStyles from '@material-ui/styles/makeStyles';

import { getStation, getStationName } from "../../services/util.service";
import { METRO_STATION_ID, Station } from "../../types";
import CloseIcon from "@material-ui/icons/Close";
import SearchIcon from "@material-ui/icons/Search";
import { searchStation } from "../../services/search.service";
import { STATIONS } from "../../data";
import { SearchResultList } from "../SearchResultList";
import { useTranslation } from "react-i18next";

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
  drawerHeaderPadding: {
    paddingLeft: "16px",
    paddingRight: "16px",
  },
  drawerContent: {
    paddingTop: "56px",
  },
}));

type RouteDrawer = {
  showRouteSearchDrawer: boolean;
  onClose: (_: boolean) => void;
  stationId: METRO_STATION_ID;
  onSelect: (_: METRO_STATION_ID) => void;
  placeHolder: string;
};

export const FromToSelectDrawer = ({
  showRouteSearchDrawer,
  onClose,
  stationId,
  onSelect,
  placeHolder,
}: RouteDrawer) => {
  const classes = useStyles();
  const station = getStation(stationId);
  const {
    i18n: { language },
  } = useTranslation();
  const stationName = station ? getStationName(station, language) : "";
  const [searchTerm, setSearchTerm] = useState<string>(stationName);
  const [searchResult, setSearchResult] = useState<Station[]>(STATIONS);

  useEffect(() => {
    if (searchTerm.length > 1) {
      const result = searchStation(searchTerm);
      setSearchResult(result);
    } else {
      setSearchResult(STATIONS);
    }
  }, [searchTerm]);

  return (
    <Drawer
      anchor={"bottom"}
      open={showRouteSearchDrawer}
      onClose={onClose}
      classes={{
        paper: classes.drawerRoot,
      }}
    >
      <Paper className={classes.drawerHeader}>
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          className={classes.drawerHeaderPadding}
        >
          <Grid item>
            <SearchIcon />
            <TextField
              placeholder={placeHolder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              variant="standard" />
          </Grid>
          <Grid item>
            <IconButton onClick={() => onClose(false)}>
              <CloseIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Paper>
      <Grid className={classes.drawerContent}>
        <SearchResultList
          searchItems={searchResult}
          handleOnItemClick={onSelect}
        />
      </Grid>
    </Drawer>
  );
};
