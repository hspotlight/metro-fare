import { colors, Colors } from "../common/colors";
import { LineType } from "../types";
import { DottedLineStyle } from "../types/styles/DottedLineStyle";
import { StationIconStyle } from "../types/styles/StationIconStyle";

type Style = {
  [key in keyof typeof LineType]?: {
    color: Colors;
    dottedLine: DottedLineStyle;
    icon: StationIconStyle;
  };
};

const StationStyles: Style = {
    'MRT_BLUE': { color: colors.mrtBlue, dottedLine: "mrt-blue-dotted-line", icon: "mrt-blue-icon" },
    'BTS_SILOM': { color: colors.btsSilom, dottedLine: "bts-silom-dotted-line", icon: "bts-silom-icon" },
    'BTS_SUKHUMVIT': { color: colors.btsSukhumvit, dottedLine: "bts-sukhumvit-dotted-line", icon: "bts-sukhumvit-icon" },
    'BTS_GOLD': { color: colors.btsGold, dottedLine: "bts-gold-dotted-line", icon: "bts-gold-icon" },
    'ARL': { color: colors.arl, dottedLine: "arl-dotted-line", icon: "arl-icon" },
    'BRT': { color: colors.brt, dottedLine: "brt-dotted-line", icon: "brt-icon" },
}

export default StationStyles;
