import { Container, Grid, Loader, Text } from "@mantine/core"
import { createContext, useContext, useState } from "react"
import { useQueryClient } from "react-query"
import { Clan, clansKey } from "../api/clans.types"
import { Lair, useLair, useUpgradeLair } from "../api/lair.types"
import { ClanContext } from "../App"
import ArmoryCard from "../components/lair/ArmoryCard"
import DomainCard from "../components/lair/DomainCard"
import HeadquarterCard from "../components/lair/HeadquarterCard"
import LaboratoryCard from "../components/lair/LaboratoryCard"
import NotorietyCard from "../components/lair/NotorietyCard"

export type LairContextType = {
    buttonsDisabled: boolean,
    lair: Lair,
    upgradeLairMutation: Awaited<ReturnType<typeof useUpgradeLair>>,
    clan: Clan
}
export const LairContext = createContext<LairContextType | null>(null);

const MyLair = () => {
    const queryClient = useQueryClient()
    const [buttonsDisabled, setButtonsDisabled] = useState(false)

    const clanContext = useContext(ClanContext)
    const clan = clanContext?.clan

    const { data: lair, isLoading, error } = useLair(clan!.id)
    const upgradeLairMutation = useUpgradeLair({
        onSuccess: () => { queryClient.invalidateQueries(clansKey) },
        onMutate: () => { setButtonsDisabled(true) },
        onSettled: () => { setButtonsDisabled(false) }
    })

    if (isLoading) {
        return (
            <Container size="xs" px="xs">
                <Loader color="grape" />
            </Container>
        )
    }
    if (error || !clan || !lair) {
        return (
            <Container size="xs" px="xs" color="red">
                <Text>{(error as Error).message}</Text>
            </Container>
        )
    }

    return (
        <LairContext.Provider value={{ buttonsDisabled, lair, upgradeLairMutation, clan }}>
            <Grid>
                <Grid.Col span={4}>
                    <HeadquarterCard />
                </Grid.Col>
                <Grid.Col span={4}>
                    <NotorietyCard />
                </Grid.Col>
                <Grid.Col span={4}>
                    <DomainCard />
                </Grid.Col>
                <Grid.Col span={4}>
                    <ArmoryCard />
                </Grid.Col>
                <Grid.Col span={4}>
                    <LaboratoryCard />
                </Grid.Col>
            </Grid >
        </LairContext.Provider>
    )
}

export default MyLair