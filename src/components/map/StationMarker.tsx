import React, { useContext } from "react";
import { CircleMarker, Popup, Tooltip } from "react-leaflet";
import { useTranslation } from "react-i18next";
import { Button } from "@material-ui/core";
import { TripContext } from "../../contexts/TripProvider";
import { getStationName } from "../../services/util.service";
import { METRO_STATION_ID } from "../../types";

const StationMarker = (props: any) => {
  const { station, showPopup = true } = props;
  const { i18n } = useTranslation();
  const stationName = `(${station.key}) ${getStationName(
    station,
    i18n.language
  )}`;

  return (
    <CircleMarker
      center={station.position}
      radius={10}
      color="black"
      weight={1.5}
      fillOpacity={1}
      {...props}
    >
      {showPopup && <StationPopup stationName={stationName} stationKey={station.key} />}
      <Tooltip>{stationName}</Tooltip>
    </CircleMarker>
  );
};

const StationPopup = ({
  stationName,
  stationKey,
}: {
  stationName: string;
  stationKey: METRO_STATION_ID;
}) => {
  const { t: translate } = useTranslation();
  const { setSource, setDestination } = useContext(TripContext);

  const popupRef = React.useRef(null);

  const closePopupOnClick = () => {
    // @ts-ignore
    popupRef.current.leafletElement.options.leaflet.map.closePopup();
  };

  return (
    <Popup ref={popupRef}>
      <section
        style={{ display: "flex", flexDirection: "column", width: "170px" }}
      >
        <h3>{stationName}</h3>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            setSource(stationKey);
            closePopupOnClick();
          }}
        >
          {translate("map.popup.setSource")}
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            setDestination(stationKey);
            closePopupOnClick();
          }}
        >
          {translate("map.popup.setDestination")}
        </Button>
      </section>
    </Popup>
  );
};

export default StationMarker;
