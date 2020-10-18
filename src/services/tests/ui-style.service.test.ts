import { colors } from "../../common/colors";
import { LineType } from "../../types";
import { getColorFromLineType, getDottedLineStyle, getInterChangeLine, getInterChangeLineColor, getStationIconStyle } from "../ui-style.service";

describe('ui-style service', () => {
    describe('getColorFromLineType', () => {
        [
            { lineType: LineType.MRT_BLUE, color: colors.mrtBlue },
            { lineType: LineType.BTS_SILOM, color: colors.btsSilom },
            { lineType: LineType.BTS_SUKHUMVIT, color: colors.btsSukhumvit },
            { lineType: LineType.ARL, color: colors.arl },
            { lineType: LineType.BRT, color: colors.brt },
            { lineType: LineType.BTS, color: colors.btsSilom },
        ].forEach(mapping => {
            it(`should return ${mapping.color} when lineType is ${mapping.lineType}`, () => {
                const color = getColorFromLineType(mapping.lineType);
                expect(color).toBe(mapping.color)
            });
        });
    });

    describe('getDottedLineStyle', () => {
        [
            { lineType: LineType.MRT_BLUE, classname: "mrt-blue-dotted-line" },
            { lineType: LineType.BTS_SILOM, classname: "bts-silom-dotted-line" },
            { lineType: LineType.BTS_SUKHUMVIT, classname: "bts-sukhumvit-dotted-line" },
            { lineType: LineType.ARL, classname: "arl-dotted-line" },
            { lineType: LineType.BRT, classname: "brt-dotted-line" },
            { lineType: LineType.BTS, classname: "bts-silom-dotted-line" },
        ].forEach(mapping => {
            it(`should return ${mapping.classname} when lineType is ${mapping.lineType}`, () => {
                const classname = getDottedLineStyle(mapping.lineType);
                expect(classname).toBe(mapping.classname)
            });
        });
    });

    describe('getStationIconStyle', () => {
        [
            { lineType: LineType.MRT_BLUE, classname: "mrt-blue-icon" },
            { lineType: LineType.BTS_SILOM, classname: "bts-silom-icon" },
            { lineType: LineType.BTS_SUKHUMVIT, classname: "bts-sukhumvit-icon" },
            { lineType: LineType.ARL, classname: "arl-icon" },
            { lineType: LineType.BRT, classname: "brt-icon" },
            { lineType: LineType.BTS, classname: "bts-silom-icon" },
        ].forEach(mapping => {
            it(`should return ${mapping.classname} when lineType is ${mapping.lineType}`, () => {
                const classname = getStationIconStyle(mapping.lineType);
                expect(classname).toBe(mapping.classname)
            });
        });
    });

    describe('getInterChangeLine', () => {
        [
            { lineType: LineType.MRT_BLUE, prevLineType: LineType.MRT_BLUE, classname: "mrt-blue-dotted-line" },
            { lineType: LineType.BTS_SILOM, prevLineType: LineType.BTS, classname: "bts-silom-dotted-line" },
            { lineType: LineType.BTS, prevLineType: LineType.BTS_SILOM, classname: "bts-silom-dotted-line" },
            { lineType: LineType.BTS_SUKHUMVIT, prevLineType: LineType.BTS, classname: "bts-sukhumvit-dotted-line" },
            { lineType: LineType.BTS, prevLineType: LineType.BTS_SUKHUMVIT, classname: "bts-sukhumvit-dotted-line" },
            { lineType: LineType.MRT_BLUE, prevLineType: LineType.ARL, classname: "interchange-dotted-line" },
        ].forEach(testObject => {
            it(`should return ${testObject.classname} when lineType  ${testObject.lineType} and prevLineType is ${testObject.prevLineType}`, () => {
                const classname = getInterChangeLine(testObject.lineType, testObject.prevLineType);
                expect(classname).toBe(testObject.classname)
            });
        });
    });

    describe('getInterChangeLineColor', () => {
        [
            { lineType: LineType.MRT_BLUE, prevLineType: LineType.MRT_BLUE, color: colors.mrtBlue },
            { lineType: LineType.BTS_SUKHUMVIT, prevLineType: LineType.BTS_SILOM, color: colors.btsSukhumvit },
            { lineType: LineType.BTS_SILOM, prevLineType: LineType.BTS_SUKHUMVIT, color: colors.btsSukhumvit },
            { lineType: LineType.MRT_BLUE, prevLineType: LineType.BTS_SUKHUMVIT, color: colors.interchangeStation },
        ].forEach(testObject => {
            it(`should return ${testObject.color} when lineType is ${testObject.lineType} and prevLineType is ${testObject.prevLineType}`, () => {
                const color = getInterChangeLineColor(testObject.lineType, testObject.prevLineType);
                expect(color).toBe(testObject.color)
            });
        });
    });
});