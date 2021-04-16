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
  const stationName = `(${station.id}) ${getStationName(
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
      {showPopup && (
        <StationPopup stationName={stationName} stationId={station.id} />
      )}
      <Tooltip>{stationName}</Tooltip>
    </CircleMarker>
  );
};

const StationPopup = ({
  stationName,
  stationId,
}: {
  stationName: string;
  stationId: METRO_STATION_ID;
}) => {
  const { t: translate } = useTranslation();
  const { trip, setTrip } = useContext(TripContext);

  const popupRef = React.useRef(null);

  const closePopupOnClick = () => {
    // @ts-ignore
    popupRef.current.leafletElement.options.leaflet.map.closePopup();
  };

  const handleSetFromTo = (
    type: "from" | "to",
    stationId: METRO_STATION_ID
  ) => {
    if (type === "from") {
      setTrip(stationId, trip.destination);
    } else {
      setTrip(trip.source, stationId);
    }
  };

  return (
    <Popup ref={popupRef} closeButton={false}>
      <section
        style={{ display: "flex", flexDirection: "column", width: "170px" }}
      >
        <h3>{stationName}</h3>
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() => {
            handleSetFromTo("from", stationId);
            closePopupOnClick();
          }}
        >
          {translate("map.popup.setFrom")}
        </Button>
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() => {
            handleSetFromTo("to", stationId);
            closePopupOnClick();
          }}
        >
          {translate("map.popup.setTo")}
        </Button>
      </section>
    </Popup>
  );
};

export default StationMarker;
