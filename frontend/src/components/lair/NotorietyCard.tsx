import { Badge, Card, Divider, Grid, Group, Image, Loader, Stack, Text } from "@mantine/core"
import { useContext } from "react"
import { LairContext } from "../../pages/MyLair"
import LairUpgradeButton from "./UpgradeButton"

const NotorietyCard = () => {
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
                    src={lair.notoriety_imageSrc}
                    height={270}
                    alt="Lair"
                />
            </Card.Section>

            <Group position="apart" mt="md" mb="xs">
                <Text weight={500}>Notoriety</Text>
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
                    <Grid.Col span={9}><Text>Mask: {lair.notoriety_mask}</Text></Grid.Col>
                    <Grid.Col span={3}>
                        <LairUpgradeButton attribute="notoriety_mask" />
                    </Grid.Col>

                    <Grid.Col span={9}><Text>Data Access: {lair.notoriety_data_access}</Text></Grid.Col>
                    <Grid.Col span={3}>
                        <LairUpgradeButton attribute="notoriety_data_access" />
                    </Grid.Col>

                    <Grid.Col span={9}><Text>Political Influence: {lair.notoriety_political_influence}</Text></Grid.Col>
                    <Grid.Col span={3}>
                        <LairUpgradeButton attribute="notoriety_political_influence" />
                    </Grid.Col>
                </Grid>
            </Stack>
        </Card>
    )
}

export default NotorietyCard