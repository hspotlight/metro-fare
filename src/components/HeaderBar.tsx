import React from "react";
import '../styles/HeaderBar.scss';

const HeaderBar = ({ title }: { title: string }) => {
  return <div className="header-bar">{title}</div>;
};

export default HeaderBar;
