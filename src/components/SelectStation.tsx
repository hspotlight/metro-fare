import { TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useTripContext } from "../contexts/TripProvider";
import { searchStation } from "../services/search.service";
import { METRO_STATION, Station } from "../types";
import { SearchResultList } from "./SearchResultList";
import "../styles/SelectStation.scss";
import { useTranslation } from "react-i18next";
import Analytics from "../analytics/Analytics";

const SelectStation = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const searchTermLength = (searchTerm || "").length;
  const [searchResult, setSearchResult] = useState<Station[]>([]);
  const { setSource, setDestination } = useTripContext();
  const history = useHistory();
  const {t: translate } = useTranslation();
  const query = new URLSearchParams(useLocation().search);
  const type = query.get('type');
  
  const textFieldLabel = () => {
    return type === 'source' ? translate('route.source') : translate('route.destination');
  }

  useEffect(() => {
    Analytics.logCurrentScreen('select_station_screen');
  }, [])

  useEffect(() => {
    if (searchTerm.length > 2) {
      const result = searchStation(searchTerm);
      setSearchResult(result);
    } else {
      setSearchResult([]);
    }
  }, [searchTerm]);

  const handleOnItemClick = (stationId: METRO_STATION) => {
    if (type === "source") {
      setSource(stationId);
      history.goBack();
    } else if (type === "destination") {
      setDestination(stationId);
      history.goBack();
    }
  };

  const getDisplayMessage = (searchTermLength: number) => {
    if (searchTermLength === 0) return translate("selectStation.startText");
    if (searchTermLength < 2) return translate("selectStation.tooShort");
    return translate("selectStation.notFound");
  }

  return (
    <div className="select-station">
      <div>
        <TextField
          className="search-box"
          id="outlined-basic"
          variant="outlined"
          label={textFieldLabel()}
          placeholder="E.g. Chong Nonsi"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {searchResult.length === 0 && (
        <div className="display-message">{getDisplayMessage(searchTermLength)}</div>
      )}
      {searchResult.length > 0 && (
        <div className="search-result">
          <SearchResultList
            searchItems={searchResult}
            handleOnItemClick={handleOnItemClick}
          />
        </div>
      )}
    </div>
  );
};

export default SelectStation;
