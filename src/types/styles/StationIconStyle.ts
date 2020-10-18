const StationIconStyle = {
    mrt: "mrt-blue-icon",
    btsSilom:"bts-silom-icon",
    btsSukhumvit:"bts-sukhumvit-icon",
    arl: "arl-icon",
    brt: "brt-icon",
} as const

export type StationIconStyle = (typeof StationIconStyle)[keyof typeof StationIconStyle]