import { InputLabel, Select } from "@material-ui/core";
import React from "react";
import { useTranslation } from "react-i18next";
import { STATIONS } from "../data";
import { Station } from "../types";
import { getLineTypeLabel, getStationName } from "../services/util.service";
import '../styles/StationSelectInput.scss';

export type StationSelectInputProps = {
  title: string;
  value: string;
  onClick: (_: any) => void;
};

const StationSelectInput = ({
  title,
  value,
  onClick,
}: StationSelectInputProps) => {
  const { i18n } = useTranslation();
  const stationElementId = `${title}-native-required`;
  return (
    <div className="station-select-input">
      <InputLabel htmlFor={stationElementId}>{title}</InputLabel>
      <Select
        native
        onChange={(e: any) => onClick(e.target.value)}
        name={"Line"}
        value={value}
        inputProps={{
          id: stationElementId,
        }}
      >
        <option value={""}></option>
        {STATIONS.map((station: Station) => {
          const stationName = getStationName(
            station,
            i18n.language
          );
          const stationLine = getLineTypeLabel(station.lineType);
          const label = `${stationLine} [${station.key}] ${stationName}`;
          return (
            <option key={station.key} value={station.key}>
              {label}
            </option>
          );
        })}
      </Select>
    </div>
  );
};

export default StationSelectInput;