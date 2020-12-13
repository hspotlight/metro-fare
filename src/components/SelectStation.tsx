import { TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useTripContext } from "../contexts/TripProvider";
import { searchStation } from "../services/search.service";
import { METRO_STATION, Station } from "../types";
import { SearchResultList } from "./SearchResultList";
import "../styles/SelectStation.scss";

type UrlParams = {
  type: "source" | "destination";
};

const SelectStation = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const searchTermLength = (searchTerm || "").length;
  const [searchResult, setSearchResult] = useState<Station[]>([]);
  const { setSource, setDestination } = useTripContext();
  const history = useHistory();
  const params = useParams<UrlParams>();

  useEffect(() => {
    if (searchTerm.length > 2) {
      const result = searchStation(searchTerm);
      setSearchResult(result);
    } else {
      setSearchResult([]);
    }
  }, [searchTerm]);

  const handleOnItemClick = (stationId: METRO_STATION) => {
    if (params.type === "source") {
      setSource(stationId);
      history.goBack();
    } else if (params.type === "destination") {
      setDestination(stationId);
      history.goBack();
    }
  };

  return (
    <div className="select-station">
      <div>
        <TextField
          className="search-box"
          id="outlined-basic"
          variant="outlined"
          label={params.type}
          placeholder="E.g. Chong Nonsi"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {searchResult.length === 0 && searchTermLength !== 0 && (
        <div className="empty-result">result not found</div>
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
