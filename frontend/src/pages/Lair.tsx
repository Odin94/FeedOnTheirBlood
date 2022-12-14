import { Grid } from "@mantine/core"
import ArmoryCard from "../components/Lair/ArmoryCard"
import DomainCard from "../components/Lair/DomainCard"
import HeadquarterCard from "../components/Lair/HeadquarterCard"
import LaboratoryCard from "../components/Lair/LaboratoryCard"
import NotorietyCard from "../components/Lair/NotorietyCard"

const Lair = () => {
    return (
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
    )
}

export default Lair