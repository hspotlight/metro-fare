const DottedLineStyle = {
    mrt: "mrt-blue-dotted-line",
    btsSilom: "bts-silom-dotted-line",
    btsSukhumvit: "bts-sukhumvit-dotted-line",
    arl: "arl-dotted-line",
    brt: "brt-dotted-line",
    interchange: "interchange-dotted-line"
} as const

export type DottedLineStyle = (typeof DottedLineStyle)[keyof typeof DottedLineStyle]