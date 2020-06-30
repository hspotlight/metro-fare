import React, { useContext } from "react";
import { CircleMarker, Popup, Tooltip } from "react-leaflet";
import { useTranslation } from "react-i18next";
import { Button } from "@material-ui/core";
import { TripContext } from "../../contexts/TripProvider";
import { getStationName } from "../../services/util.service";
import { Station } from "../../data/Stations";

const StationMarker = ({
  station,
  color,
}: {
  station: Station;
  color: string;
}) => {
  const { t: translate, i18n } = useTranslation();
  const { setSource, setDestination } = useContext(TripContext);
  const stationName = `(${station.key}) ${getStationName(
    station,
    i18n.language
  )}`;
  const popupRef = React.useRef(null);

  const closePopusOnClick = () => {
    // @ts-ignore
    popupRef.current.leafletElement.options.leaflet.map.closePopup();
  };

  return (
    <CircleMarker
      center={station.position}
      radius={10}
      color="black"
      weight={1.5}
      fillColor={color}
      fillOpacity={1}
    >
      <Popup ref={popupRef}>
        <section
          style={{ display: "flex", flexDirection: "column", width: "170px" }}
        >
          <h3>{stationName}</h3>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setSource(station.key);
              closePopusOnClick();
            }}
          >
            {translate("map.popup.setSource")}
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setDestination(station.key);
              closePopusOnClick();
            }}
          >
            {translate("map.popup.setDestination")}
          </Button>
        </section>
      </Popup>
      <Tooltip>{stationName}</Tooltip>
    </CircleMarker>
  );
};

export default StationMarker;
