import { Button, Container, Grid, Group, Loader, SegmentedControl, Select, Space, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { useContext } from "react";
import { useQueryClient } from "react-query";
import { clansKey, useUpdateClan } from "../api/clans.types";
import { useGetMyVampires, useUpdateVampire, vampiresKey } from "../api/vampires.type";
import { ClanContext } from "../App";
import VampireCard from "../components/vampire/VampireCard";
import { isVampireCurrentlyBusy } from "../components/vampire/VampireUtils";
import fangsIcon from '../images/fangs-svgrepo-com.svg';
import { randomFloatFromInterval } from "../utils/general-utils";

interface FormValues {
    lycanSize: string
    targetVampireId: string
}

type Lycan = {
    strength: number,
    blood: number,
    influence: number,
}

const HuntLycans = () => {
    const { data: vampires, isLoading, error } = useGetMyVampires()
    const queryClient = useQueryClient()
    const vampireMutation = useUpdateVampire()
    const clanMutation = useUpdateClan()
    const form = useForm<FormValues>({
        initialValues: {
            lycanSize: "Pupper",
            targetVampireId: "1",
        },

        validate: {
            lycanSize: (_value: string) => null,
            targetVampireId: (_value: string) => null,
        },
    });

    const clanContext = useContext(ClanContext)
    const clan = clanContext?.clan

    if (isLoading) {
        return (
            <Container size="xs" px="xs">
                <Loader color="grape" />
            </Container>
        )
    }
    if (error || !vampires) {
        return (
            <Container size="xs" px="xs" color="red">
                <Text>{(error as Error).message}</Text>
            </Container>
        )
    }

    const selectedVampire = vampires.find(vampire => vampire.id === parseInt(form.values.targetVampireId))
    const startHunt = (values: FormValues) => {
        if (!selectedVampire) return
        if (!clan) throw new Error("No clan provided")

        const lycanMap: Record<string, Lycan> = {
            "Pupper": { strength: 2, blood: 500, influence: 200 },
            "Youngling": { strength: 4, blood: 1100, influence: 600 },
            "Fully Grown": { strength: 8, blood: 2500, influence: 1400 },
            "Elder": { strength: 16, blood: 10000, influence: 4000 },
        }
        const lycan = lycanMap[values.lycanSize]

        const remainingHealth = Math.max(selectedVampire.current_health - lycan.strength, 0)
        console.log(remainingHealth)
        vampireMutation.mutate({
            ...selectedVampire,
            current_health: remainingHealth
        })

        if (remainingHealth > 0) {
            const bloodReward = Math.round(lycan.blood * randomFloatFromInterval(0.8, 1.2))
            const influenceReward = Math.round(lycan.influence * randomFloatFromInterval(0.8, 1.2))

            clanMutation.mutate({
                ...clan,
                blood: clan.blood + bloodReward,
                influence: clan.influence + influenceReward,
            }, { onSuccess: () => { queryClient.invalidateQueries(clansKey); queryClient.invalidateQueries(vampiresKey); } })

            showNotification({
                title: `Gained 🩸${bloodReward}, Influence ${influenceReward}`,
                message: ``,
                color: 'red'
            })
        } else {
            showNotification({
                title: `Fight lost, no reward`,
                message: ``,
                color: 'blue'
            })
        }
    }
    return (
        <form onSubmit={form.onSubmit((_values) => startHunt(form.values))}>
            {selectedVampire
                ? <Grid>
                    <Grid.Col span={3} />
                    <Grid.Col span={6}>
                        <VampireCard vampire={selectedVampire} />
                    </Grid.Col>
                    <Grid.Col span={3} />
                </Grid>
                : null}

            <Group position="center" mt="md">
                <Select
                    label="Choose a vampire to attack with"
                    placeholder=""
                    data={vampires.map((vampire) => { return { value: `${vampire.id}`, label: vampire.name } })}
                    {...form.getInputProps('targetVampireId')}
                />
            </Group>

            <Space h="xl" />

            <Group position="center" mt="md">

                <SegmentedControl
                    name="time"
                    color="red"
                    transitionDuration={200}
                    transitionTimingFunction="linear"
                    {...form.getInputProps("lycanSize")}
                    data={[
                        { label: 'Pupper', value: 'Pupper' },
                        { label: 'Youngling', value: 'Youngling' },
                        { label: 'Fully Grown', value: 'Fully Grown' },
                        { label: 'Elder', value: 'Elder' },
                    ]}
                />
            </Group>

            <Group position="center" mt="xl">
                <Button
                    disabled={!selectedVampire || isVampireCurrentlyBusy(selectedVampire)}
                    type="submit"
                    color="red"
                    size="lg"
                    leftIcon={<img alt="fangs" src={fangsIcon} width="20" style={{ filter: "invert(96%) sepia(4%) saturate(1720%) hue-rotate(217deg) brightness(111%) contrast(100%)" }} />}
                >Hunt!</Button>
            </Group>
        </form>
    )
}

export default HuntLycans