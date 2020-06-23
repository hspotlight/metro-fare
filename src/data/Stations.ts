import { LatLngTuple } from "leaflet";
import { MRT_BLUE_STATION, BTS_SILOM_STATION, METRO_STATION, LineType } from "../types";

export type Station = {
    lineType: LineType,
    key: METRO_STATION,
    nameEN: string,
    nameTH: string,
    position: LatLngTuple
    isNotAvailable?: boolean,
}

export const STATIONS: Station[] = [
    { lineType: LineType.BTS_SILOM, key: BTS_SILOM_STATION.NATIONAL_STADIUM, nameEN: "National Stadium", nameTH: "สนามกีฬาแห่งชาติ", position: [13.746527,100.529095] },
    { lineType: LineType.BTS_SILOM, key: BTS_SILOM_STATION.SIAM, nameEN: "Siam", nameTH: "สยาม", position: [13.745629,100.534212] },
    { lineType: LineType.BTS_SILOM, key: BTS_SILOM_STATION.RATCHADAMRI, nameEN: "Ratchadamri", nameTH: "ราชดำริ", position: [13.739466,100.539472] },
    { lineType: LineType.BTS_SILOM, key: BTS_SILOM_STATION.SALA_DAENG, nameEN: "Sala Deang", nameTH: "ศาลาแดง", position: [13.728581,100.534352] },
    { lineType: LineType.BTS_SILOM, key: BTS_SILOM_STATION.CHONG_NONSI, nameEN: "Chong Nonsi", nameTH: "ช่องนนทรี", position: [13.723741,100.529329] },
    { lineType: LineType.BTS_SILOM, key: BTS_SILOM_STATION.SUKSA_WITTHAYA, nameEN: "Suksa Witthaya", nameTH: "ศึกษาวิทยา", position: [13.720719,100.526518], isNotAvailable: true },
    { lineType: LineType.BTS_SILOM, key: BTS_SILOM_STATION.SURASAK, nameEN: "Surasak", nameTH: "สุรศักดิ์", position: [13.719367,100.521556] },
    { lineType: LineType.BTS_SILOM, key: BTS_SILOM_STATION.SAPHAN_TAKSIN, nameEN: "Sahpan Taksin", nameTH: "สะพานตากสิน", position: [13.718808,100.514227] },
    { lineType: LineType.BTS_SILOM, key: BTS_SILOM_STATION.KRUNG_THON_BURI, nameEN: "Krung Thon Buri", nameTH: "กรุงธนบุรี", position: [13.720951,100.502868] },
    { lineType: LineType.BTS_SILOM, key: BTS_SILOM_STATION.WONGWIAN_YAI, nameEN: "Wongwian Yai", nameTH: "วงเวียนใหญ่", position: [13.721097,100.495213] },
    { lineType: LineType.BTS_SILOM, key: BTS_SILOM_STATION.PHO_NIMIT, nameEN: "Pho Nimit", nameTH: "โพธิ์นิมิตร", position: [13.719175,100.485978] },
    { lineType: LineType.BTS_SILOM, key: BTS_SILOM_STATION.TALAT_PHLU, nameEN: "Talat Phlu", nameTH: "ตลาดพลู", position: [13.714049,100.476350] },
    { lineType: LineType.BTS_SILOM, key: BTS_SILOM_STATION.WUTTHAKAT, nameEN: "Wutthakat", nameTH: "วุฒากาศ", position: [13.712864,100.469270] },
    { lineType: LineType.BTS_SILOM, key: BTS_SILOM_STATION.BANG_WA, nameEN: "Bang Wa", nameTH: "บางหว้า", position: [13.721087,100.457810] },

    { lineType: LineType.MRT_BLUE, key: MRT_BLUE_STATION.CHARAN_13, nameEN: "Charan 13", nameTH: "จรัญฯ 13", position: [13.740013,100.470773] },
    { lineType: LineType.MRT_BLUE, key: MRT_BLUE_STATION.FAI_CHAI, nameEN: "Fai chai", nameTH: "ไฟฉาย", position: [13.755730,100.469326] },
    { lineType: LineType.MRT_BLUE, key: MRT_BLUE_STATION.BANG_KHUN_NON, nameEN: "Bang Khun Non", nameTH: "บางขุนนนท์", position: [13.763704,100.473645] },
    { lineType: LineType.MRT_BLUE, key: MRT_BLUE_STATION.BANG_YI_KHAN, nameEN: "Bang Yi Khan", nameTH: "บางยี่ขัน", position: [13.777401,100.485307] },
    { lineType: LineType.MRT_BLUE, key: MRT_BLUE_STATION.SIRINDHORN, nameEN: "Sirindhorn", nameTH: "สิรินธร", position: [13.783793,100.493201] },
    { lineType: LineType.MRT_BLUE, key: MRT_BLUE_STATION.BANG_PHLAT, nameEN: "Bang Phlat", nameTH: "บางพลัด", position: [13.792322,100.504897] },
    { lineType: LineType.MRT_BLUE, key: MRT_BLUE_STATION.BANG_O, nameEN: "Bang O", nameTH: "บางอ้อ", position: [13.798907,100.509790] },
    { lineType: LineType.MRT_BLUE, key: MRT_BLUE_STATION.BANG_PHO, nameEN: "Bang Pho", nameTH: "บางโพ", position: [13.806387,100.521049] },
    { lineType: LineType.MRT_BLUE, key: MRT_BLUE_STATION.TAO_POON, nameEN: "Tao Poon", nameTH: "เตาปูน", position: [13.806106,100.531158] },
    { lineType: LineType.MRT_BLUE, key: MRT_BLUE_STATION.BANG_SUE, nameEN: "Bang Sue", nameTH: "บางซื่อ", position: [13.802664,100.540289] },
    { lineType: LineType.MRT_BLUE, key: MRT_BLUE_STATION.KAMPHAENG_PHET, nameEN: "Kamphaeng Phet", nameTH: "กำแพงเพชร", position: [13.797936,100.547939] },
    { lineType: LineType.MRT_BLUE, key: MRT_BLUE_STATION.CHATUCHAK_PARK, nameEN: "Chatuchak Park", nameTH: "สวนจตุจักร", position: [13.802614,100.553738] },
    { lineType: LineType.MRT_BLUE, key: MRT_BLUE_STATION.PHAHON_YOTHIN, nameEN: "Phahon Yothin", nameTH: "พหลโยธิน", position: [13.812951,100.561568] },
    { lineType: LineType.MRT_BLUE, key: MRT_BLUE_STATION.LAT_PHRAO, nameEN: "Lat Phrao", nameTH: "ลาดพร้าว", position: [13.806608,100.572893] },
    { lineType: LineType.MRT_BLUE, key: MRT_BLUE_STATION.RATCHADAPHISEK, nameEN: "Ratchadaphisek", nameTH: "รัชดาภิเษก", position: [13.799000,100.574505] },
    { lineType: LineType.MRT_BLUE, key: MRT_BLUE_STATION.SUTTHISAN, nameEN: "Sutthisan", nameTH: "สุทธิสาร", position: [13.789450,100.573984] },
    { lineType: LineType.MRT_BLUE, key: MRT_BLUE_STATION.HUAI_KHWANG, nameEN: "Huai Khwang", nameTH: "ห้วยขวาง", position: [13.778769,100.573503] },
    { lineType: LineType.MRT_BLUE, key: MRT_BLUE_STATION.THAILAND_CULTURAL_CENTRE, nameEN: "Thailand Cultural Centre", nameTH: "ศูนย์วัฒนธรรมแห่งประเทศไทย", position: [13.766408,100.570138] },
    { lineType: LineType.MRT_BLUE, key: MRT_BLUE_STATION.PHRA_RAM_9, nameEN: "Phra Ram 9", nameTH: "พระราม 9", position: [13.757854,100.565250] },
    { lineType: LineType.MRT_BLUE, key: MRT_BLUE_STATION.PHETCHABURI, nameEN: "Phetchaburi", nameTH: "เพชรบุรี", position: [13.749198,100.563422] },
    { lineType: LineType.MRT_BLUE, key: MRT_BLUE_STATION.SUKHUMVIT, nameEN: "Sukhumvit", nameTH: "สุขุมวิท", position: [13.737434,100.561368] },
    { lineType: LineType.MRT_BLUE, key: MRT_BLUE_STATION.QUEEN_SIRIKIT_NATIONAL_CONVENTION_CENTRE, nameEN: "Queen Sirikit National Convention Centre", nameTH: "ศูนย์การประชุมแห่งชาติสิริกิติ์", position: [13.722606,100.559953] },
    { lineType: LineType.MRT_BLUE, key: MRT_BLUE_STATION.KHLONG_TOEI, nameEN: "Khlong Toei", nameTH: "คลองเตย", position: [13.722307,100.554036] },
    { lineType: LineType.MRT_BLUE, key: MRT_BLUE_STATION.LUMPHINI, nameEN: "Lumphini", nameTH: "ลุมพินี", position: [13.725501,100.545714] },
    { lineType: LineType.MRT_BLUE, key: MRT_BLUE_STATION.SILOM, nameEN: "Silom", nameTH: "สีลม", position: [13.729262,100.537309] },
    { lineType: LineType.MRT_BLUE, key: MRT_BLUE_STATION.SAM_YAN, nameEN: "Sam Yan", nameTH: "สามย่าน", position: [13.732157,100.530254] },
    { lineType: LineType.MRT_BLUE, key: MRT_BLUE_STATION.HUA_LAMPHONG, nameEN: "Hua Lamphong", nameTH: "หัวลำโพง", position: [13.737478,100.517158] },
    { lineType: LineType.MRT_BLUE, key: MRT_BLUE_STATION.WAT_MANGKON, nameEN: "Wat Mangkon", nameTH: "วัดมังกร", position: [13.741911,100.510132] },
    { lineType: LineType.MRT_BLUE, key: MRT_BLUE_STATION.SAM_YOT, nameEN: "Sam Yot", nameTH: "สามยอด", position: [13.747073,100.502150] },
    { lineType: LineType.MRT_BLUE, key: MRT_BLUE_STATION.SANAM_CHAI, nameEN: "Sanam Chai", nameTH: "สยามไชย", position: [13.744273,100.494697] },
    { lineType: LineType.MRT_BLUE, key: MRT_BLUE_STATION.ITSARAPHAP, nameEN: "Itsaraphap", nameTH: "อิสรภาพ", position: [13.738375,100.485701] },
    { lineType: LineType.MRT_BLUE, key: MRT_BLUE_STATION.THAPHRA, nameEN: "Thaphra", nameTH: "ท่าพระ", position: [13.729800,100.474151] },
    { lineType: LineType.MRT_BLUE, key: MRT_BLUE_STATION.BANG_PHAI, nameEN: "Bang Phai", nameTH: "บางไผ่", position: [13.724900,100.465539] },
    { lineType: LineType.MRT_BLUE, key: MRT_BLUE_STATION.BANG_WA, nameEN: "Bang Wa", nameTH: "บางหว้า", position: [13.720402,100.457030] },
    { lineType: LineType.MRT_BLUE, key: MRT_BLUE_STATION.PHETKASEM_48, nameEN: "Phetkasem 48", nameTH: "เพชรเกษม 48", position: [13.715700,100.445960] },
    { lineType: LineType.MRT_BLUE, key: MRT_BLUE_STATION.PHASI_CHAROEN, nameEN: "Phasi Charoen", nameTH: "ภาษีเจริญ", position: [13.712904,100.434328] },
    { lineType: LineType.MRT_BLUE, key: MRT_BLUE_STATION.BANG_KHAE, nameEN: "Bang Khae", nameTH: "บางแค", position: [13.711939,100.422306] },
    { lineType: LineType.MRT_BLUE, key: MRT_BLUE_STATION.LAK_SONG, nameEN: "Lak Song", nameTH: "หลักสอง", position: [13.710900,100.409439] },
];
