import { BTS_GOLD_ID, BTS_SILOM_STATION_ID, BTS_SUKHUMVIT_STATION_ID, METRO_STATION_ID } from "../types";

type BTSId = {
    id: METRO_STATION_ID,
    btsId: number
}

// Order must not change
export const BTS_ID: BTSId[] = [
    {id: BTS_SUKHUMVIT_STATION_ID.KHU_KHOT, btsId: 79},
    {id: BTS_SUKHUMVIT_STATION_ID.YAEK_KOR_POR_AOR, btsId: 78},
    {id: BTS_SUKHUMVIT_STATION_ID.ROYAL_THAI_AIR_FORCE_MUSEUM, btsId: 77},
    {id: BTS_SUKHUMVIT_STATION_ID.BHUMIBOL_ADULYADEJ_HOSPITAL, btsId: 76},
    {id: BTS_SUKHUMVIT_STATION_ID.SAPHAN_MAI, btsId: 75},
    {id: BTS_SUKHUMVIT_STATION_ID.SAI_YUD, btsId: 74},
    {id: BTS_SUKHUMVIT_STATION_ID.PHAHON_YOTHIN_59, btsId: 73},
    {id: BTS_SUKHUMVIT_STATION_ID.WAT_PHRA_SRI_MAHATHAT, btsId: 69},
    {id: BTS_SUKHUMVIT_STATION_ID.INFANTRY_REGIMENT_11, btsId: 68},
    {id: BTS_SUKHUMVIT_STATION_ID.BANG_BUA, btsId: 67},
    {id: BTS_SUKHUMVIT_STATION_ID.ROYAL_FOREST_DEPARTMENT, btsId: 66},
    {id: BTS_SUKHUMVIT_STATION_ID.KASETSART_UNIVERSITY, btsId: 62},
    {id: BTS_SUKHUMVIT_STATION_ID.SENA_NIKHOM, btsId: 61},
    {id: BTS_SUKHUMVIT_STATION_ID.RATCHAYOTHIN, btsId: 60},
    {id: BTS_SUKHUMVIT_STATION_ID.PHAHON_YOTHIN_24, btsId: 59},
    {id: BTS_SUKHUMVIT_STATION_ID.HA_YEAK_LAT_PHRAO, btsId: 54},
    {id: BTS_SUKHUMVIT_STATION_ID.MO_CHIT, btsId: 1},
    {id: BTS_SUKHUMVIT_STATION_ID.SAPHAN_KHWAI, btsId: 2},
    {id: BTS_SUKHUMVIT_STATION_ID.ARI, btsId: 3},
    {id: BTS_SUKHUMVIT_STATION_ID.SANAM_PAO, btsId: 4},
    {id: BTS_SUKHUMVIT_STATION_ID.VICTORY_MONUMENT, btsId: 5},
    {id: BTS_SUKHUMVIT_STATION_ID.PHAYA_THAI, btsId: 6},
    {id: BTS_SUKHUMVIT_STATION_ID.RATCHATHEWI, btsId: 7},
    {id: BTS_SUKHUMVIT_STATION_ID.SIAM, btsId: 8},
    {id: BTS_SUKHUMVIT_STATION_ID.CHIT_LOM, btsId: 9},
    {id: BTS_SUKHUMVIT_STATION_ID.PHOLEN_CHIT, btsId: 10},
    {id: BTS_SUKHUMVIT_STATION_ID.NANA, btsId: 11},
    {id: BTS_SUKHUMVIT_STATION_ID.ASOK, btsId: 12},
    {id: BTS_SUKHUMVIT_STATION_ID.PHROM_PHONG, btsId: 13},
    {id: BTS_SUKHUMVIT_STATION_ID.THONG_LO, btsId: 14},
    {id: BTS_SUKHUMVIT_STATION_ID.EKKAMAI, btsId: 15},
    {id: BTS_SUKHUMVIT_STATION_ID.PHRA_KHANONG, btsId: 16},
    {id: BTS_SUKHUMVIT_STATION_ID.ON_NUT, btsId: 17},
    {id: BTS_SUKHUMVIT_STATION_ID.BANG_CHAK, btsId: 18},
    {id: BTS_SUKHUMVIT_STATION_ID.PUNNAWITHI, btsId: 19},
    {id: BTS_SUKHUMVIT_STATION_ID.UDOM_SUK, btsId: 20},
    {id: BTS_SUKHUMVIT_STATION_ID.BANG_NA, btsId: 21},
    {id: BTS_SUKHUMVIT_STATION_ID.BEARING, btsId: 22},
    {id: BTS_SUKHUMVIT_STATION_ID.SAMRONG, btsId: 23},
    {id: BTS_SUKHUMVIT_STATION_ID.PU_CHAO, btsId: 46},
    {id: BTS_SUKHUMVIT_STATION_ID.CHANG_ERAWAN, btsId: 47},
    {id: BTS_SUKHUMVIT_STATION_ID.ROYAL_THAI_NAVAL_ACADEMY, btsId: 48},
    {id: BTS_SUKHUMVIT_STATION_ID.PAK_NAM, btsId: 49},
    {id: BTS_SUKHUMVIT_STATION_ID.SRINAGARINDRA, btsId: 50},
    {id: BTS_SUKHUMVIT_STATION_ID.PHRAEK_SA, btsId: 51},
    {id: BTS_SUKHUMVIT_STATION_ID.SAI_LUAT, btsId: 52},
    {id: BTS_SUKHUMVIT_STATION_ID.KHEHA, btsId: 53},
    { id: BTS_SILOM_STATION_ID.NATIONAL_STADIUM, btsId: 26},
    { id: BTS_SILOM_STATION_ID.RATCHADAMRI, btsId: 28},
    { id: BTS_SILOM_STATION_ID.SALA_DAENG, btsId: 29},
    { id: BTS_SILOM_STATION_ID.CHONG_NONSI, btsId: 30},
    { id: BTS_SILOM_STATION_ID.SAINT_LOUIS, btsId: 80},
    { id: BTS_SILOM_STATION_ID.SURASAK, btsId: 31},
    { id: BTS_SILOM_STATION_ID.SAPHAN_TAKSIN, btsId: 32},
    { id: BTS_SILOM_STATION_ID.KRUNG_THON_BURI, btsId: 33},
    { id: BTS_SILOM_STATION_ID.WONGWIAN_YAI, btsId: 34},
    { id: BTS_SILOM_STATION_ID.PHO_NIMIT, btsId: 35},
    { id: BTS_SILOM_STATION_ID.TALAT_PHLU, btsId: 36},
    { id: BTS_SILOM_STATION_ID.WUTTHAKAT, btsId: 37},
    { id: BTS_SILOM_STATION_ID.BANG_WA, btsId: 38},
    { id: BTS_GOLD_ID.KRUNG_THON_BURI, btsId: 70},
    { id: BTS_GOLD_ID.CHAROEN_NAKHON, btsId: 71},
    { id: BTS_GOLD_ID.KHLONG_SAN, btsId: 72},
];