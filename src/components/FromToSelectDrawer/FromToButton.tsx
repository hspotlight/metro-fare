import React from "react";
import { useTranslation } from "react-i18next";
import { IconButton, Typography } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { getStation, getStationName } from "../../services/util.service";
import { METRO_STATION_ID } from "../../types";
import "./FromToButton.scss";

type FromToButtonProps = {
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
}: FromToButtonProps) => {
  const { i18n } = useTranslation();
  const station = getStation(stationId);
  return (
    <>
      <IconButton
        className={station ? "from-to-button-width70" : "from-to-button"}
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
