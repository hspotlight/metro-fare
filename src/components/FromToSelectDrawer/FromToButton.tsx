import React from "react";
import { useTranslation } from "react-i18next";
import { IconButton, makeStyles, Typography } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { getStation, getStationName } from "../../services/util.service";
import { METRO_STATION_ID } from "../../types";

const useStyles = makeStyles(() => ({
  button: {
    borderRadius: "0px",
  },
  buttonWith70: {
    width: "70%",
  },
}));

type FromToButton = {
  stationId: METRO_STATION_ID;
  handleUnselect: () => void;
  placeHolder: string;
  onClick: () => void;
};

export const FromToButton = ({
  stationId,
  handleUnselect,
  placeHolder,
  onClick,
}: FromToButton) => {
  const { i18n } = useTranslation();
  const classes = useStyles();
  const station = getStation(stationId);
  return (
    <>
      <IconButton
        className={`${classes.button} ${station ? classes.buttonWith70 : ""}`}
        size="small"
        onClick={onClick}
      >
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
