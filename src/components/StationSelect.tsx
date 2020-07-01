import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FormControl, InputLabel, Select, FormHelperText } from "@material-ui/core";
import { STATIONS } from "../data/Stations";
import { LineType, Station, BTS_SILOM_STATION, BTS_SUKHUMVIT_STATION } from "../types";
import { getStationName } from "../services/util.service";
import "../styles/StationSelect.scss";

const StationSelect = ({
  title,
  value,
  onChange,
}: {
  title: string;
  value: string;
  onChange: Function;
}) => {
  const { t: translate, i18n } = useTranslation();
  const [lineType, setLineType] = useState<LineType>(LineType.MRT_BLUE);
  const lineElementId = `${title}-line-native-required`;
  const selectElementId = `${title}-native-required`;
  const isStationAvailable = (station: Station) => station.lineType === lineType && !station.isNotAvailable
  const stationsName = STATIONS.filter(isStationAvailable);

  const handleLineTypeSelectChange = (value: string) => {
    setLineType(value as LineType);
    onChange("");
  };

  useEffect(() => {
    if (Object.values(BTS_SILOM_STATION).find((btsKey) => btsKey === value)) {
      setLineType(LineType.BTS_SILOM);
    } else if (Object.values(BTS_SUKHUMVIT_STATION).find((btsKey) => btsKey === value)) {
      setLineType(LineType.BTS_SUKHUMVIT);
    } else if (value.length !== 0) {
      setLineType(LineType.MRT_BLUE);
    }
  }, [value]);

  return (
    <section>
      <FormControl className="line-type-select" required>
        <InputLabel htmlFor={lineElementId}>
          {translate("lineType.line")}
        </InputLabel>
        <Select
          native
          onChange={(e: any) => handleLineTypeSelectChange(e.target.value)}
          name={"Line"}
          value={lineType}
          inputProps={{
            id: lineElementId,
          }}
        >
          <option value={"MRT_BLUE"}>{translate("lineType.mrtBlue")}</option>
          <option value={"BTS_SILOM"}>{translate("lineType.btsSilom")}</option>
          <option value={"BTS_SUKHUMVIT"}>{translate("lineType.btsSukhumvit")}</option>
        </Select>
        <FormHelperText>{translate("common.required")}</FormHelperText>
      </FormControl>
      <FormControl className="station-select" required>
        <InputLabel htmlFor={selectElementId}>{title}</InputLabel>
        <Select
          native
          onChange={(e) => onChange(e.target.value)}
          name={title}
          value={value}
          inputProps={{
            id: selectElementId,
          }}
        >
          <option value="" disabled></option>
          {stationsName.map((station: Station) => {
            const label = `(${station.key}) ${getStationName(station, i18n.language)}`;
            return (
              <option key={station.key} value={station.key}>
                {label}
              </option>
            );
          })}
        </Select>
        <FormHelperText>{translate("common.required")}</FormHelperText>
      </FormControl>
    </section>
  );
};

export default StationSelect;
