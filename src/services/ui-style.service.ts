import { LineType } from "../types";
import { colors, Colors } from "../common/colors";
import { DottedLineStyle } from "../types/styles/DottedLineStyle";
import { StationIconStyle } from "../types/styles/StationIconStyle";
import StationStyles from "../data/StationStyle";

export const getColorFromLineType = (lineType: LineType): Colors => {
  return StationStyles[lineType]?.color || colors.btsSilom;
}

export const getDottedLineStyle = (lineType: LineType): DottedLineStyle => {
  return StationStyles[lineType]?.dottedLine || "bts-silom-dotted-line";
};

export const getStationIconStyle = (lineType: LineType): StationIconStyle => {
  return StationStyles[lineType]?.icon || "bts-silom-icon";
};

// TODO: rename and refactor
// TODO: fix color ari->surasuk siam station icon color
export const getInterChangeLine = (
  currentLineType: LineType,
  prevLineType: LineType
): DottedLineStyle => {
  if (currentLineType === prevLineType) {
    return getDottedLineStyle(currentLineType);
  } else {
    if (
      (currentLineType === LineType.BTS && prevLineType === LineType.BTS_SILOM) ||
      (currentLineType === LineType.BTS_SILOM && prevLineType === LineType.BTS)) {
      return getDottedLineStyle(LineType.BTS_SILOM);
    }
    if (
      (currentLineType === LineType.BTS && prevLineType === LineType.BTS_SUKHUMVIT) ||
      (currentLineType === LineType.BTS_SUKHUMVIT && prevLineType === LineType.BTS)) {
      return getDottedLineStyle(LineType.BTS_SUKHUMVIT);
    }
    return "interchange-dotted-line";
  }
};

// TODO: rename and refactor, check logic with getInterchangeLine
export const getInterChangeLineColor = (
  currentLineType: LineType,
  prevLineType: LineType
): Colors => {
  if (currentLineType === prevLineType) {
    return getColorFromLineType(currentLineType);
  } else {
    if (
      // siam (silom line) to any sukhumvit station
      (currentLineType === LineType.BTS_SUKHUMVIT && prevLineType === LineType.BTS_SILOM) ||
      (currentLineType === LineType.BTS_SILOM && prevLineType === LineType.BTS_SUKHUMVIT)) {
      return getColorFromLineType(LineType.BTS_SUKHUMVIT);
    }
    return colors.interchangeStation;
  }
};
