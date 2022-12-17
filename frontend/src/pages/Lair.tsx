import { Container, Grid, Loader, Text } from "@mantine/core"
import { useMyClan } from "../api/clans.types"
import ArmoryCard from "../components/lair/ArmoryCard"
import DomainCard from "../components/lair/DomainCard"
import HeadquarterCard from "../components/lair/HeadquarterCard"
import LaboratoryCard from "../components/lair/LaboratoryCard"
import NotorietyCard from "../components/lair/NotorietyCard"

const Lair = () => {
    const { data: clan, isLoading, error } = useMyClan()

    if (isLoading) {
        return (
            <Container size="xs" px="xs">
                <Loader color="grape" />
            </Container>
        )
    }
    if (error || !clan) {
        return (
            <Container size="xs" px="xs" color="red">
                <Text>{(error as Error)?.message}</Text>
            </Container>
        )
    }

    return (
        <Grid>
            <Grid.Col span={4}>
                <HeadquarterCard clanId={clan.id} />
            </Grid.Col>
            <Grid.Col span={4}>
                <NotorietyCard clanId={clan.id} />
            </Grid.Col>
            <Grid.Col span={4}>
                <DomainCard clanId={clan.id} />
            </Grid.Col>
            <Grid.Col span={4}>
                <ArmoryCard clanId={clan.id} />
            </Grid.Col>
            <Grid.Col span={4}>
                <LaboratoryCard clanId={clan.id} />
            </Grid.Col>
        </Grid >
    )
}

export default Lair