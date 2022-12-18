import { Badge, Card, Divider, Grid, Group, Image, Loader, Stack, Text } from "@mantine/core"
import { useContext } from "react"
import { LairContext } from "../../pages/MyLair"
import LairUpgradeButton from "./UpgradeButton"

const HeadquarterCard = () => {
    const lairContext = useContext(LairContext)
    if (!lairContext) {
        return (
            <Loader color="grape" />
        )
    }
    const { lair } = lairContext

    return (
        <Card shadow="sm" p="lg" radius="md" withBorder>
            <Card.Section>
                <Image
                    src={lair.headquarter_imageSrc}
                    height={270}
                    alt="Lair"
                />
            </Card.Section>

            <Group position="apart" mt="md" mb="xs">
                <Text weight={500}>Headquarter</Text>
                <Badge color="pink" variant="light">
                    Lvl: 5
                </Badge>
            </Group>

            <Text size="sm" color="dimmed">
                This is a real cool element sample text lorem ipsum dolor sit amet
            </Text>

            <Divider my="sm" />

            <Stack>
                <Grid>
                    <Grid.Col span={9}><Text>Defense: {lair.headquarter_defense}</Text></Grid.Col>
                    <Grid.Col span={3}>
                        <LairUpgradeButton attribute="headquarter_defense" />
                    </Grid.Col>

                    <Grid.Col span={9}><Text>Luxury: {lair.headquarter_luxury}</Text></Grid.Col>
                    <Grid.Col span={3}>
                        <LairUpgradeButton attribute="headquarter_luxury" />
                    </Grid.Col>

                    <Grid.Col span={9}><Text>Hidden: {lair.headquarter_hidden}</Text></Grid.Col>
                    <Grid.Col span={3}>
                        <LairUpgradeButton attribute="headquarter_hidden" />
                    </Grid.Col>
                </Grid>
            </Stack>
        </Card>
    )
}



export default HeadquarterCard