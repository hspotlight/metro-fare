export const METRO_FARE: FARE = {
    'BRT': [15],
    'ARL': [15, 15, 20, 25, 30, 35, 40, 45],
    'BTS': [16, 16, 23, 26, 30, 33, 37, 40, 44, 44, 44, 44, 44, 44],
    'MRT_BLUE': [16, 16, 19, 21, 23, 25, 28, 30, 32, 35, 37, 39, 42, 42],
    'MRT_PURPLE': [14, 17, 20, 23, 25, 27, 30, 33, 36, 38, 40, 42, 42, 42],
}

export type FARE = {
    BRT: number[]
    ARL: number[]
    BTS: number[]
    MRT_BLUE: number[]
    MRT_PURPLE: number[]
}
