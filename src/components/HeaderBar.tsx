import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import "../styles/HeaderBar.scss";

type HeaderBarProps = {
  title: string;
  backButton?: boolean;
};

const HeaderBar = ({ title, backButton }: HeaderBarProps) => {
  const history = useHistory()
  const location = useLocation()

  const goBack = () => {
    if (location.pathname === '/routes') {
      history.replace('/');
    }
    if (location.pathname === '/select-station/source' || location.pathname === '/select-station/destination') {
      history.replace('/');
    }
    if (location.pathname === '/route-detail') {
      const query = new URLSearchParams(location.search);
      const source = query.get('source');
      const destination = query.get('destination');
      history.replace(`/routes?source=${source}&destination=${destination}`);
    }
  }

  return (
    <div className="header-bar">
      {backButton && (
        <div className="back-button" onClick={goBack}>
          <i className="fa fa-chevron-left" aria-hidden="true" />
        </div>
      )}
      <div className="header-title">{title}</div>
    </div>
  );
};

export default HeaderBar;
