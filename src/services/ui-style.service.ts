import { LineType } from "../types";
import { colors } from "../common/colors";
import { DottedLineStyle } from "../types/styles/dottedLineStyle";
import { StationIconStyle } from "../types/styles/StationIconStyle";

export const getColorFromLineType = (lineType: LineType): colors => {
  switch(lineType) {
    case LineType.MRT_BLUE: return colors.mrtBlue;
    case LineType.BTS_SILOM: return colors.btsSilom;
    case LineType.BTS_SUKHUMVIT: return colors.btsSukhumvit;
    case LineType.ARL: return colors.arl;
    case LineType.BRT: return colors.brt;
    default: return colors.btsSilom;
  }
}

export const getDottedLineStyle = (lineType: LineType): DottedLineStyle => {
  switch (lineType) {
    case LineType.MRT_BLUE: return "mrt-blue-dotted-line";
    case LineType.BTS_SILOM: return "bts-silom-dotted-line";
    case LineType.BTS_SUKHUMVIT: return "bts-sukhumvit-dotted-line";
    case LineType.ARL: return "arl-dotted-line";
    case LineType.BRT: return "brt-dotted-line";
    default: return "bts-silom-dotted-line";
  }
};

export const getStationIconStyle = (lineType: LineType): StationIconStyle => {
  switch (lineType) {
    case LineType.MRT_BLUE: return "mrt-blue-icon";
    case LineType.BTS_SILOM: return "bts-silom-icon";
    case LineType.BTS_SUKHUMVIT: return "bts-sukhumvit-icon";
    case LineType.ARL: return "arl-icon";
    case LineType.BRT: return "brt-icon";
    default: return "bts-silom-icon";
  }
};

// TODO: rename and refactor
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
): colors => {
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
