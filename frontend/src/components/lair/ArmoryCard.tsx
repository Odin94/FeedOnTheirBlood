import { Badge, Card, Divider, Grid, Group, Image, Loader, Stack, Text } from "@mantine/core"
import { useContext } from "react"
import { LairContext } from "../../pages/MyLair"
import LairUpgradeButton from "./UpgradeButton"

const ArmoryCard = () => {
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
                    src={lair.armory_imageSrc}
                    height={270}
                    alt="Lair"
                />
            </Card.Section>

            <Group position="apart" mt="md" mb="xs">
                <Text weight={500}>Armory</Text>
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
                    <Grid.Col span={9}><Text>Weapons: {lair.armory_weapons}</Text></Grid.Col>
                    <Grid.Col span={3}>
                        <LairUpgradeButton attribute="armory_weapons" />
                    </Grid.Col>

                    <Grid.Col span={9}><Text>Armor: {lair.armory_armor}</Text></Grid.Col>
                    <Grid.Col span={3}>
                        <LairUpgradeButton attribute="armory_armor" />
                    </Grid.Col>
                </Grid>
            </Stack>
        </Card>
    )
}

export default ArmoryCard