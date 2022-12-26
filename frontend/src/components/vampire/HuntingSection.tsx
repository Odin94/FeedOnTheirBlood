import { Button, Group, SegmentedControl, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import dayjs from 'dayjs';
import { useContext, useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';
import { clansKey, useUpdateClan } from '../../api/clans.types';
import { useUpdateVampire, Vampire, vampiresKey } from "../../api/vampires.type";
import { ClanContext } from '../../App';
import { randomFloatFromInterval } from '../../utils/general-utils';
import fangsIcon from '../../images/fangs-svgrepo-com.svg';

interface FormValues {
    time: string
}
const HuntingSection = ({ vampire }: { vampire: Vampire }) => {
    const queryClient = useQueryClient()
    const [remainingTime, setRemainingTime] = useState<string>("00:00:00")
    const [claimingRewards, setClaimingRewards] = useState(false)
    const vampireMutation = useUpdateVampire()
    const clanMutation = useUpdateClan()

    const clanContext = useContext(ClanContext)
    const clan = clanContext?.clan

    useEffect(() => {
        const endTime = dayjs.utc(vampire.busy_until_utc)
        var currentTime = dayjs.utc()
        var diffTime = endTime.unix() - currentTime.unix()

        var duration = dayjs.duration(diffTime * 1000, "milliseconds")
        var intervalMillis = 1000

        const dd = (num: number) => {
            if (num < 10) return `0${num}`
            return `${num}`
        }

        const interval = setInterval(function () {
            duration = dayjs.duration(
                duration.asMilliseconds() - intervalMillis,
                "milliseconds"
            )
            let timestamp = `${dd(duration.hours())}:${dd(duration.minutes())}:${dd(duration.seconds())}`
            if (!timestamp.includes("NaN")) {
                setRemainingTime(timestamp)
            }
        }, intervalMillis)

        return () => { clearTimeout(interval) }
    }, [vampire.busy_until_utc])

    const form = useForm<FormValues>({
        initialValues: {
            time: "10",
        },

        validate: {
            time: (_value: string) => null,
        },
    })

    const startHunt = ({ time }: FormValues) => {
        switch (time) {
            case '10':
                vampire.busy_until_utc = dayjs.utc().add(1, 'minutes').toISOString()
                vampire.current_action = "hunt_10"
                break;
            case '30':
                vampire.busy_until_utc = dayjs.utc().add(30, 'minutes').toISOString()
                vampire.current_action = "hunt_30"
                break;
            case '60':
                vampire.busy_until_utc = dayjs.utc().add(60, 'minutes').toISOString()
                vampire.current_action = "hunt_60"
                break;
            default:
                throw Error(`Failed to hunt for vampire ${vampire}`)
        }

        vampireMutation.mutate(vampire)
    }

    const claimRewards = () => {
        setClaimingRewards(true)

        const rewardMap: Record<string, number> = {
            "10": 500,
            "30": 1000,
            "60": 3000,
        }

        const duration = vampire.current_action?.split("_")[1]
        if (!duration || !rewardMap[duration]) throw new Error(`Invalid duration: ${duration} from action ${vampire.current_action}`)
        if (!clan) throw new Error("No clan provided")
        const reward = rewardMap[duration] * randomFloatFromInterval(0.8, 1.2)

        vampireMutation.mutate({
            ...vampire,
            busy_until_utc: null,
            current_action: null
        })
        clanMutation.mutate({
            ...clan,
            money: clan.money + reward,
            blood: clan.blood + reward
        }, { onSuccess: () => { queryClient.invalidateQueries(clansKey); queryClient.invalidateQueries(vampiresKey); setClaimingRewards(false); } })

        showNotification({
            title: 'Hunting reward claimed!',
            message: `Gained 🩸${reward}`,
            color: 'red'
        })
    }

    if (isVampireDoneHunting(vampire)) return (
        <Button variant="light" color="grape" fullWidth mt="md" radius="md" onClick={claimRewards} disabled={claimingRewards}
            leftIcon={<img alt="fangs" src={fangsIcon} width="20" style={{ filter: "invert(96%) sepia(4%) saturate(1720%) hue-rotate(217deg) brightness(111%) contrast(100%)" }} />}>
            Claim Rewards
        </Button>
    )
    if (isVampireCurrentlyBusy(vampire)) {
        return (
            <Text size="md">
                Busy with {getActivityName(vampire)} for {remainingTime}
            </Text>
        )
    }

    return (
        <form onSubmit={form.onSubmit((_values) => startHunt(form.values))}>
            <Group position="center" mt="md">
                <SegmentedControl
                    name={`time-${vampire.id}`}
                    color="red"
                    transitionDuration={200}
                    transitionTimingFunction="linear"
                    {...form.getInputProps('time')}
                    data={[
                        { label: 'Quick - 10 min', value: '10' },
                        { label: 'Medium - 30 min', value: '30' },
                        { label: 'Long - 60 min', value: '60' },
                    ]}
                />
            </Group>

            <Group position="center" mt="xl">
                <Button
                    type="submit"
                    color="grape"
                    size="lg"
                    leftIcon={<img alt="fangs" src={fangsIcon} width="20" style={{ filter: "invert(96%) sepia(4%) saturate(1720%) hue-rotate(217deg) brightness(111%) contrast(100%)" }} />}
                >Hunt!</Button>
            </Group>
        </form>
    )
}

const isVampireCurrentlyBusy = (vampire: Vampire) => {
    if (!vampire.busy_until_utc) return false

    const doneDate = dayjs.utc(vampire.busy_until_utc)
    const now = dayjs.utc()
    return now.isBefore(doneDate)
}

const isVampireDoneHunting = (vampire: Vampire) => {
    if (!vampire.current_action?.startsWith("hunt")) return false
    if (!vampire.busy_until_utc) return false

    const doneDate = dayjs.utc(vampire.busy_until_utc)
    const now = dayjs.utc()
    return now.isAfter(doneDate)
}

const getActivityName = (vampire: Vampire) => {
    if (vampire.current_action?.startsWith("hunt")) {
        return "hunting"
    }

    return ""
}

export default HuntingSection