import React from 'react';
import { useTranslation } from 'react-i18next';
import "../../styles/MapLegend.scss";

const MapLegend = () => {
    const {t: translate} = useTranslation();
    return (
        <div className="map-legend">
            <div className="title">{translate("map.legend.legend")}</div>
            <div className="legend">
                <div className="legend-key-value">
                    <div className="key mrt-blue-line">
                        <div className="line"></div>
                        <div className="circle"></div>
                        <div className="line"></div>
                    </div>
                    <div>{translate("map.legend.mrtBlueLine")}</div>
                </div>
                <div className="legend-key-value">
                    <div className="key bts-silom-line">
                        <div className="line"></div>
                        <div className="circle"></div>
                        <div className="line"></div>
                    </div>
                    <div>{translate("map.legend.btsSilomLine")}</div>
                </div>
                <div className="legend-key-value">
                    <div className="key bts-sukhumvit-line">
                        <div className="line"></div>
                        <div className="circle"></div>
                        <div className="line"></div>
                    </div>
                    <div>{translate("map.legend.btsSukhumvitLine")}</div>
                </div>
            </div>
        </div>
    );
}

export default MapLegend;