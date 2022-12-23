export const randomIntFromInterval = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

export const randomFloatFromInterval = (min: number, max: number, fixTo: number = 2): number => {
    return parseFloat((Math.random() * (max - min) + min).toFixed(fixTo))
}