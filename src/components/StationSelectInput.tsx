import { Input, InputLabel } from "@material-ui/core";
import React from "react";
import { useTranslation } from "react-i18next";
import { STATIONS } from "../data";
import { Station } from "../types";
import { getLineTypeLabel, getStationName } from "../services/util.service";
import "../styles/StationSelectInput.scss";

export type StationSelectInputProps = {
  title: string;
  value: string;
  onFocus: (_: any) => void;
};

const StationSelectInput = ({
  title,
  value,
  onFocus,
}: StationSelectInputProps) => {
  const { i18n } = useTranslation();
  const stationElementId = `${title}-native-required`;
  const station = STATIONS.find((station) => station.key === value);
  const getStationLabel = (station: Station | undefined) => {
    if (!station) return "";

    const lineType = getLineTypeLabel(station.lineType);
    const stationName = getStationName(station, i18n.language);
    return station ? `${lineType} [${station.key}] ${stationName}` : "";
  };
  const label = getStationLabel(station);
  return (
    <div className="station-select-input" onFocus={onFocus}>
      <InputLabel htmlFor={stationElementId}>{title}</InputLabel>
      <Input className="station-input" value={label} />
    </div>
  );
};

export default StationSelectInput;
