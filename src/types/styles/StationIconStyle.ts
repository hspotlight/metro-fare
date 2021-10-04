const StationIconStyle = {
    mrt: "mrt-blue-icon",
    btsSilom:"bts-silom-icon",
    btsSukhumvit:"bts-sukhumvit-icon",
    btsGold:"bts-gold-icon",
    arl: "arl-icon",
    brt: "brt-icon",
} as const

export type StationIconStyle = (typeof StationIconStyle)[keyof typeof StationIconStyle]