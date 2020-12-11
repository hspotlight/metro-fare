import { Input } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useTripContext } from "../contexts/TripProvider";
import { searchStation } from "../services/search.service";
import { METRO_STATION, Station } from "../types";
import { SearchResultList } from "./SearchResultList";

const SelectStation = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const searchTermLength = (searchTerm || "").length;
  const [searchResult, setSearchResult] = useState<Station[]>([]);
  const { setSource, setDestination } = useTripContext();
  const history = useHistory();
  const params: { type: "source" | "destination" } = useParams();

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
    <div>
      <Input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {searchTermLength === 0 && <div> please select station</div>}
      {searchTermLength !== 0 && searchTermLength <= 2 && <div>less word</div>}
      {searchTermLength >= 3 && (
        <SearchResultList
          searchItems={searchResult}
          handleOnItemClick={handleOnItemClick}
        />
      )}
    </div>
  );
};

export default SelectStation;
