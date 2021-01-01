import React from "react";
import { useTranslation } from "react-i18next";
import { getLineTypeLabel, getStationName } from "../services/util.service";
import { METRO_STATION_ID, Station } from "../types";
import "../styles/SearchResultList.scss";

type SearchResultListProps = {
  searchItems: Station[];
  handleOnItemClick: (_: METRO_STATION_ID) => void;
};

export const SearchResultList = ({
  searchItems,
  handleOnItemClick,
}: SearchResultListProps) => {
  return (
    <div className="search-result-list">
      <div>
        {searchItems.map((item, index) => (
          <SearchItem key={index} item={item} onClick={handleOnItemClick} />
        ))}
      </div>
    </div>
  );
};

type SearchItemProps = {
  item: Station;
  onClick: (_: METRO_STATION_ID) => void;
};

const SearchItem = ({ item, onClick }: SearchItemProps) => {
  const { i18n } = useTranslation();
  const lineType = getLineTypeLabel(item.lineType);
  const stationName = getStationName(item, i18n.language);
  return (
    <div
      className="search-item"
      onClick={() => onClick(item.id)}
    >{`${lineType} [${item.id}] ${stationName}`}</div>
  );
};
