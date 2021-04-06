import React from "react";
import "./SettingButton.scss";

const SettingButton = () => {
  const onSettingClick = () => {
    console.log("click)");
  };
  return (
    <div className="setting-container">
      <i
        className="fas fa-cog setting-icon"
        aria-hidden="true"
        onClick={onSettingClick}
      />
    </div>
  );
};

export default SettingButton;
