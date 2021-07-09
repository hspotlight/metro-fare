export const colors = {
    mrtBlue: '#1E3A8D',
    mrtPurple: '#85348F',
    btsSukhumvit: '#79B828',
    btsSilom: '#00817D',
    btsGold: '#A58701',
    arl: '#E30713',
    brt: '#DCDC00',
    fromStation: '#3AAACF',
    toStation: '#F80012',
    interchangeStation: '#AAAAAA',
} as const;

export type Colors = typeof colors[keyof typeof colors];
