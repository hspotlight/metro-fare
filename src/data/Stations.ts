import { MRT_BLUE_STATION, BTS_SILOM_STATION, METRO_STATION, LineType } from "../types";

export type Station = {
    lineType: LineType,
    key: METRO_STATION,
    nameEN: string,
    nameTH: string,
    isNotAvailable?: boolean,
}

export const STATIONS: Station[] = [
    { lineType: LineType.BTS_SILOM, key: BTS_SILOM_STATION.NATIONAL_STADIUM, nameEN: "National Stadium", nameTH: "สนามกีฬาแห่งชาติ" },
    { lineType: LineType.BTS_SILOM, key: BTS_SILOM_STATION.SIAM, nameEN: "Siam", nameTH: "สยาม" },
    { lineType: LineType.BTS_SILOM, key: BTS_SILOM_STATION.RATCHADAMRI, nameEN: "Ratchadamri", nameTH: "ราชดำริ" },
    { lineType: LineType.BTS_SILOM, key: BTS_SILOM_STATION.SALA_DAENG, nameEN: "Sala Deang", nameTH: "ศาลาแดง" },
    { lineType: LineType.BTS_SILOM, key: BTS_SILOM_STATION.CHONG_NONSI, nameEN: "Chong Nonsi", nameTH: "ช่องนนทรี" },
    { lineType: LineType.BTS_SILOM, key: BTS_SILOM_STATION.SUKSA_WITTHAYA, nameEN: "Suksa Witthaya", nameTH: "ศึกษาวิทยา", isNotAvailable: true },
    { lineType: LineType.BTS_SILOM, key: BTS_SILOM_STATION.SURASAK, nameEN: "Surasak", nameTH: "สุรศักดิ์" },
    { lineType: LineType.BTS_SILOM, key: BTS_SILOM_STATION.SAPHAN_TAKSIN, nameEN: "Sahpan Taksin", nameTH: "สะพานตากสิน" },
    { lineType: LineType.BTS_SILOM, key: BTS_SILOM_STATION.KRUNG_THON_BURI, nameEN: "Krung Thon Buri", nameTH: "กรุงธนบุรี" },
    { lineType: LineType.BTS_SILOM, key: BTS_SILOM_STATION.WONGWIAN_YAI, nameEN: "Wongwian Yai", nameTH: "วงเวียนใหญ่" },
    { lineType: LineType.BTS_SILOM, key: BTS_SILOM_STATION.PHO_NIMIT, nameEN: "Pho Nimit", nameTH: "โพธิ์นิมิตร" },
    { lineType: LineType.BTS_SILOM, key: BTS_SILOM_STATION.TALAT_PHLU, nameEN: "Talat Phlu", nameTH: "ตลาดพลู" },
    { lineType: LineType.BTS_SILOM, key: BTS_SILOM_STATION.WUTTHAKAT, nameEN: "Wutthakat", nameTH: "วุฒากาศ" },
    { lineType: LineType.BTS_SILOM, key: BTS_SILOM_STATION.BANG_WA, nameEN: "Bang Wa", nameTH: "บางหว้า" },

    { lineType: LineType.MRT_BLUE, key: MRT_BLUE_STATION.CHARAN_13, nameEN: "Charan 13", nameTH: "จรัญฯ 13" },
    { lineType: LineType.MRT_BLUE, key: MRT_BLUE_STATION.FAI_CHAI, nameEN: "Fai chai", nameTH: "ไฟฉาย" },
    { lineType: LineType.MRT_BLUE, key: MRT_BLUE_STATION.BANG_KHUN_NON, nameEN: "Bang Khun Non", nameTH: "บางขุนนนท์" },
    { lineType: LineType.MRT_BLUE, key: MRT_BLUE_STATION.BANG_YI_KHAN, nameEN: "Bang Yi Khan", nameTH: "บางยี่ขัน" },
    { lineType: LineType.MRT_BLUE, key: MRT_BLUE_STATION.SIRINDHORN, nameEN: "Sirindhorn", nameTH: "สิรินธร" },
    { lineType: LineType.MRT_BLUE, key: MRT_BLUE_STATION.BANG_PHLAT, nameEN: "Bang Phlat", nameTH: "บางพลัด" },
    { lineType: LineType.MRT_BLUE, key: MRT_BLUE_STATION.BANG_O, nameEN: "Bang O", nameTH: "บางอ้อ" },
    { lineType: LineType.MRT_BLUE, key: MRT_BLUE_STATION.BANG_PHO, nameEN: "Bang Pho", nameTH: "บางโพ" },
    { lineType: LineType.MRT_BLUE, key: MRT_BLUE_STATION.TAO_POON, nameEN: "Tao Poon", nameTH: "เตาปูน" },
    { lineType: LineType.MRT_BLUE, key: MRT_BLUE_STATION.BANG_SUE, nameEN: "Bang Sue", nameTH: "บางซื่อ" },
    { lineType: LineType.MRT_BLUE, key: MRT_BLUE_STATION.KAMPHAENG_PHET, nameEN: "Kamphaeng Phet", nameTH: "กำแพงเพชร" },
    { lineType: LineType.MRT_BLUE, key: MRT_BLUE_STATION.CHATUCHAK_PARK, nameEN: "Chatuchak Park", nameTH: "สวนจตุจักร" },
    { lineType: LineType.MRT_BLUE, key: MRT_BLUE_STATION.PHAHON_YOTHIN, nameEN: "Phahon Yothin", nameTH: "พหลโยธิน" },
    { lineType: LineType.MRT_BLUE, key: MRT_BLUE_STATION.LAT_PHRAO, nameEN: "Lat Phrao", nameTH: "ลาดพร้าว" },
    { lineType: LineType.MRT_BLUE, key: MRT_BLUE_STATION.RATCHADAPHISEK, nameEN: "Ratchadaphisek", nameTH: "รัชดาภิเษก" },
    { lineType: LineType.MRT_BLUE, key: MRT_BLUE_STATION.SUTTHISAN, nameEN: "Sutthisan", nameTH: "สุทธิสาร" },
    { lineType: LineType.MRT_BLUE, key: MRT_BLUE_STATION.HUAI_KHWANG, nameEN: "Huai Khwang", nameTH: "ห้วยขวาง" },
    { lineType: LineType.MRT_BLUE, key: MRT_BLUE_STATION.THAILAND_CULTURAL_CENTRE, nameEN: "Thailand Cultural Centre", nameTH: "ศูนย์วัฒนธรรมแห่งประเทศไทย" },
    { lineType: LineType.MRT_BLUE, key: MRT_BLUE_STATION.PHRA_RAM_9, nameEN: "Phra Ram 9", nameTH: "พระราม 9" },
    { lineType: LineType.MRT_BLUE, key: MRT_BLUE_STATION.PHETCHABURI, nameEN: "Phetchaburi", nameTH: "เพชรบุรี" },
    { lineType: LineType.MRT_BLUE, key: MRT_BLUE_STATION.SUKHUMVIT, nameEN: "Sukhumvit", nameTH: "สุขุมวิท" },
    { lineType: LineType.MRT_BLUE, key: MRT_BLUE_STATION.QUEEN_SIRIKIT_NATIONAL_CONVENTION_CENTRE, nameEN: "Queen Sirikit National Convention Centre", nameTH: "ศูนย์การประชุมแห่งชาติสิริกิติ์" },
    { lineType: LineType.MRT_BLUE, key: MRT_BLUE_STATION.KHLONG_TOEI, nameEN: "Khlong Toei", nameTH: "คลองเตย" },
    { lineType: LineType.MRT_BLUE, key: MRT_BLUE_STATION.LUMPHINI, nameEN: "Lumphini", nameTH: "ลุมพินี" },
    { lineType: LineType.MRT_BLUE, key: MRT_BLUE_STATION.SILOM, nameEN: "Silom", nameTH: "สีลม" },
    { lineType: LineType.MRT_BLUE, key: MRT_BLUE_STATION.SAM_YAN, nameEN: "Sam Yan", nameTH: "สามย่าน" },
    { lineType: LineType.MRT_BLUE, key: MRT_BLUE_STATION.HUA_LAMPHONG, nameEN: "Hua Lamphong", nameTH: "หัวลำโพง" },
    { lineType: LineType.MRT_BLUE, key: MRT_BLUE_STATION.WAT_MANGKON, nameEN: "Wat Mangkon", nameTH: "วัดมังกร" },
    { lineType: LineType.MRT_BLUE, key: MRT_BLUE_STATION.SAM_YOT, nameEN: "Sam Yot", nameTH: "สามยอด" },
    { lineType: LineType.MRT_BLUE, key: MRT_BLUE_STATION.SANAM_CHAI, nameEN: "Sanam Chai", nameTH: "สยามไชย" },
    { lineType: LineType.MRT_BLUE, key: MRT_BLUE_STATION.ITSARAPHAP, nameEN: "Itsaraphap", nameTH: "อิสรภาพ" },
    { lineType: LineType.MRT_BLUE, key: MRT_BLUE_STATION.THAPHRA, nameEN: "Thaphra", nameTH: "ท่าพระ" },
    { lineType: LineType.MRT_BLUE, key: MRT_BLUE_STATION.BANG_PHAI, nameEN: "Bang Phai", nameTH: "บางไผ่" },
    { lineType: LineType.MRT_BLUE, key: MRT_BLUE_STATION.BANG_WA, nameEN: "Bang Wa", nameTH: "บางหว้า" },
    { lineType: LineType.MRT_BLUE, key: MRT_BLUE_STATION.PHETKASEM_48, nameEN: "Phetkasem 48", nameTH: "เพชรเกษม 48" },
    { lineType: LineType.MRT_BLUE, key: MRT_BLUE_STATION.PHASI_CHAROEN, nameEN: "Phasi Charoen", nameTH: "ภาษีเจริญ" },
    { lineType: LineType.MRT_BLUE, key: MRT_BLUE_STATION.BANG_KHAE, nameEN: "Bang Khae", nameTH: "บางแค" },
    { lineType: LineType.MRT_BLUE, key: MRT_BLUE_STATION.LAK_SONG, nameEN: "Lak Song", nameTH: "หลักสอง" },
];
