import { MRT_BLUE_STATION, BTS_SILOM_STATION, METRO_STATION } from "../types";

export type STATION_NAME_KEY = 'BTS' | "MRT_BLUE"

type StationName = {
    'BTS': Station[],
    'MRT_BLUE': Station[],
}

export type Station = {
    key: METRO_STATION,
    nameEN: string
}

export const STATION_NAME: StationName = {
    'BTS': [
        { key: BTS_SILOM_STATION.NATIONAL_STADIUM, nameEN: 'National Stadium' },
        { key: BTS_SILOM_STATION.RATCHADAMRI, nameEN: 'Ratchadamri' },
        { key: BTS_SILOM_STATION.SALA_DAENG, nameEN: 'Sala Deang' },
        { key: BTS_SILOM_STATION.CHONG_NONSI, nameEN: 'Chong Nonsi' },
        // BTS_SILOM_STATION.SUKSA_WITTHAYA, not finished construction yet
        { key: BTS_SILOM_STATION.SURASAK, nameEN: 'Surasak' },
        { key: BTS_SILOM_STATION.SAPHAN_TAKSIN, nameEN: 'Sahpan Taksin' },
        { key: BTS_SILOM_STATION.KRUNG_THON_BURI, nameEN: 'Krung Thon Buri' },
        { key: BTS_SILOM_STATION.WONGWIAN_YAI, nameEN: 'Wongwian Yai' },
        { key: BTS_SILOM_STATION.PHO_NIMIT, nameEN: 'Pho Nimit' },
        { key: BTS_SILOM_STATION.TALAT_PHLU, nameEN: 'Talat Phlu' },
        { key: BTS_SILOM_STATION.WUTTHAKAT, nameEN: 'Wutthakat' },
        { key: BTS_SILOM_STATION.BANG_WA, nameEN: 'Bang Wa' },
    ],
    'MRT_BLUE': [
        { key: MRT_BLUE_STATION.CHARAN_13, nameEN: "Charan 13" },
        { key: MRT_BLUE_STATION.FAI_CHAI, nameEN: "Fai chai" },
        { key: MRT_BLUE_STATION.BANG_KHUN_NON, nameEN: "Bang Khun Non" },
        { key: MRT_BLUE_STATION.BANG_YI_KHAN, nameEN: "Bang Yi Khan" },
        { key: MRT_BLUE_STATION.SIRINDHORN, nameEN: "Sirindhorn" },
        { key: MRT_BLUE_STATION.BANG_PHLAT, nameEN: "Bang Phlat" },
        { key: MRT_BLUE_STATION.BANG_O, nameEN: "Bang O" },
        { key: MRT_BLUE_STATION.BANG_PHO, nameEN: "Bang Pho" },
        { key: MRT_BLUE_STATION.TAO_POON, nameEN: "Tao Poon" },
        { key: MRT_BLUE_STATION.BANG_SUE, nameEN: "Bang Sue" },
        { key: MRT_BLUE_STATION.KAMPHAENG_PHET, nameEN: "Kamphaeng Phet" },
        { key: MRT_BLUE_STATION.CHATUCHAK_PARK, nameEN: "Chatuchak Park" },
        { key: MRT_BLUE_STATION.PHAHON_YOTHIN, nameEN: "Phahon Yothin" },
        { key: MRT_BLUE_STATION.LAT_PHRAO, nameEN: "Lat Phrao" },
        { key: MRT_BLUE_STATION.RATCHADAPHISEK, nameEN: "Ratchadaphisek" },
        { key: MRT_BLUE_STATION.SUTTHISAN, nameEN: "Sutthisan" },
        { key: MRT_BLUE_STATION.HUAI_KHWANG, nameEN: "Huai Khwang" },
        { key: MRT_BLUE_STATION.THAILAND_CULTURAL_CENTRE, nameEN: "Thailand Cultural Centre" },
        { key: MRT_BLUE_STATION.PHRA_RAM_9, nameEN: "Phra Ram 9" },
        { key: MRT_BLUE_STATION.PHETCHABURI, nameEN: "Phetchaburi" },
        { key: MRT_BLUE_STATION.SUKHUMVIT, nameEN: "Sukhumvit" },
        { key: MRT_BLUE_STATION.QUEEN_SIRIKIT_NATIONAL_CONVENTION_CENTRE, nameEN: "Queen Sirikit National Convention Centre" },
        { key: MRT_BLUE_STATION.KHLONG_TOEI, nameEN: "Khlong Toei" },
        { key: MRT_BLUE_STATION.LUMPHINI, nameEN: "Lumphini" },
        { key: MRT_BLUE_STATION.SILOM, nameEN: "Silom" },
        { key: MRT_BLUE_STATION.SAM_YAN, nameEN: "Sam Yan" },
        { key: MRT_BLUE_STATION.HUA_LAMPHONG, nameEN: "Hua Lamphong" },
        { key: MRT_BLUE_STATION.WAT_MANGKON, nameEN: "Wat Mangkon" },
        { key: MRT_BLUE_STATION.SAM_YOT, nameEN: "Sam Yot" },
        { key: MRT_BLUE_STATION.SANAM_CHAI, nameEN: "Sanam Chai" },
        { key: MRT_BLUE_STATION.ITSARAPHAP, nameEN: "Itsaraphap" },
        { key: MRT_BLUE_STATION.THAPHRA, nameEN: "Thaphra" },
        { key: MRT_BLUE_STATION.BANG_PHAI, nameEN: "Bang Phai" },
        { key: MRT_BLUE_STATION.BANG_WA, nameEN: "Bang Wa" },
        { key: MRT_BLUE_STATION.PHETKASEM_48, nameEN: "Phetkasem 48" },
        { key: MRT_BLUE_STATION.PHASI_CHAROEN, nameEN: "Phasi Charoen" },
        { key: MRT_BLUE_STATION.BANG_KHAE, nameEN: "Bang Khae" },
        { key: MRT_BLUE_STATION.LAK_SONG, nameEN: "Lak Song" },
    ]
}
