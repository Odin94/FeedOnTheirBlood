
export type Work = {
    endTime: Date,
    duration: number,
    type: string,
}

let store = new Map<string, Work>()
const hourInMs = 1000 * 60 * 60

export const startWork = (userId: string, duration: number, type: string): Work | null => {
    const endTime = new Date()
    endTime.setDate(endTime.getTime() + duration * hourInMs)
    const work: Work = {
        endTime: endTime,
        type,
        duration
    }

    if (store.has(userId)) {
        return null
    }

    store.set(userId, work)

    return work
}

export const completeOngoingWork = (): Map<string, Work> => {
    const now = new Date()
    const completed = new Map([...store].filter(([_userId, work]) => work.endTime >= now))
    store = new Map([...store].filter(([_userId, work]) => work.endTime < now))

    return completed
}
setInterval(function () {
    const completed = completeOngoingWork()
    for (const [userId, work] of completed.entries()) {
        rewardWork(userId, work)
    }
}, 5000);

const rewardWork = (userId: string, work: Work) => {
    const randomIntFromInterval = (min: number, max: number): number => {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }
    const modifier = randomIntFromInterval(10, 12) / 10
    const reward = 100 * work.duration * modifier
    // TODO give reward to user, probably in a user-feature-file
}
