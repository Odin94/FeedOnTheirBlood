import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import utc from "dayjs/plugin/utc";
import { Vampire } from "../../api/vampires.type";

dayjs.extend(duration)
dayjs.extend(utc)

export const isVampireCurrentlyBusy = (vampire: Vampire) => {
    if (vampire.current_action) return true
    if (!vampire.busy_until_utc) return false

    const doneDate = dayjs.utc(vampire.busy_until_utc)
    const now = dayjs.utc()
    return now.isBefore(doneDate)
}

export const isVampireDoneWith = (activity: "hunt" | "work", vampire: Vampire) => {
    if (!vampire.current_action?.startsWith(activity)) return false
    if (!vampire.busy_until_utc) return false

    const doneDate = dayjs.utc(vampire.busy_until_utc)
    const now = dayjs.utc()
    return now.isAfter(doneDate)
}

export const getActivityName = (vampire: Vampire) => {
    if (vampire.current_action?.startsWith("work")) {
        return "work"
    }
    if (vampire.current_action?.startsWith("hunt")) {
        return "hunting"
    }

    return ""
}
