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
import { getActivityName, isVampireCurrentlyBusy, isVampireDoneWith } from './VampireUtils';

interface FormValues {
    time: string
}
const HuntingSection = ({ vampire }: { vampire: Vampire }) => {
    const queryClient = useQueryClient()
    const [remainingTime, setRemainingTime] = useState<string>("--:--:--")
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

        // Without this check each HuntingSection will have an automatic counter ticking down, even if the vampire isn't busy at all
        if (duration.asMilliseconds() > 0) {
            const interval = setInterval(function () {
                duration = dayjs.duration(
                    duration.asMilliseconds() - intervalMillis,
                    "milliseconds"
                )
                let timestamp = `${dd(duration.hours())}:${dd(duration.minutes())}:${dd(duration.seconds())}`
                if (!timestamp.includes("NaN") && duration.asMilliseconds() >= 0) {
                    setRemainingTime(timestamp)
                }
            }, intervalMillis)

            return () => { clearTimeout(interval) }
        }
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
                // Lower time set for testing
                vampire.busy_until_utc = dayjs.utc().add(10, 'seconds').toISOString()
                vampire.current_action = "hunt_10"
                // Setting time manually to avoid issues with the interval only updating after a second
                setRemainingTime("00:10:00")
                break;
            case '30':
                vampire.busy_until_utc = dayjs.utc().add(30, 'minutes').toISOString()
                vampire.current_action = "hunt_30"
                setRemainingTime("00:30:00")
                break;
            case '60':
                vampire.busy_until_utc = dayjs.utc().add(60, 'minutes').toISOString()
                vampire.current_action = "hunt_60"
                setRemainingTime("00:60:00")
                break;
            default:
                throw Error(`Failed to hunt for vampire ${vampire}`)
        }

        vampireMutation.mutate(vampire, {
            onSuccess: () => {
                queryClient.invalidateQueries(vampiresKey)
            }
        })
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
            current_blood: vampire.max_blood,
            busy_until_utc: null,
            current_action: null
        })
        clanMutation.mutate({
            ...clan,
            blood: clan.blood + reward
        }, { onSuccess: () => { queryClient.invalidateQueries(clansKey); queryClient.invalidateQueries(vampiresKey); setClaimingRewards(false); } })

        showNotification({
            title: `Gained 🩸${reward}`,
            message: "",
            color: 'red'
        })
    }

    if (isVampireDoneWith("hunt", vampire)) return (
        <Button variant="light" color="grape" fullWidth mt="md" radius="md" onClick={claimRewards} disabled={claimingRewards}
            leftIcon={<img alt="fangs" src={fangsIcon} width="20" style={{ filter: "invert(96%) sepia(4%) saturate(1720%) hue-rotate(217deg) brightness(111%) contrast(100%)" }} />}>
            Claim Rewards
        </Button>
    )
    if (isVampireCurrentlyBusy(vampire) && getActivityName(vampire) === "hunting") {
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
                    disabled={isVampireCurrentlyBusy(vampire)}
                    type="submit"
                    color="red"
                    size="lg"
                    variant="outline"
                    leftIcon={<img alt="fangs" src={fangsIcon} width="20" style={{ filter: "invert(96%) sepia(4%) saturate(1720%) hue-rotate(217deg) brightness(111%) contrast(100%)" }} />}
                >Hunt!</Button>
            </Group>
        </form>
    )
}

export default HuntingSection