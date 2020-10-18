export const colors = {
    mrtBlue: '#1E3A8D',
    mrtPurple: '#85348F',
    btsSukhumvit: '#79B828',
    btsSilom: '#00817D',
    arl: '#E30713',
    brt: '#DCDC00',
    sourceStation: '#3AAACF',
    destinationStation: '#F80012',
    interchangeStation: '#AAAAAA',
} as const;

export type colors = (typeof colors)[keyof typeof colors]
