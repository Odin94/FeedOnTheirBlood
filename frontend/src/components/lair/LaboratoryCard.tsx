import { Badge, Card, Divider, Grid, Group, Image, Loader, Stack, Text } from "@mantine/core"
import { useContext } from "react"
import { LairContext } from "../../pages/MyLair"
import LairUpgradeButton from "./UpgradeButton"

const LaboratoryCard = () => {
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
                    src={lair.laboratory_imageSrc}
                    height={270}
                    alt="Lair"
                />
            </Card.Section>

            <Group position="apart" mt="md" mb="xs">
                <Text weight={500}>Laboratory</Text>
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
                    <Grid.Col span={9}><Text>Equipment: {lair.laboratory_equipment}</Text></Grid.Col>
                    <Grid.Col span={3}>
                        <LairUpgradeButton attribute="laboratory_equipment" />
                    </Grid.Col>

                    <Grid.Col span={9}><Text>Worker Slots: {lair.laboratory_worker_slots}</Text></Grid.Col>
                    <Grid.Col span={3}>
                        <LairUpgradeButton attribute="laboratory_worker_slots" />
                    </Grid.Col>
                </Grid>
            </Stack>
        </Card>
    )
}

export default LaboratoryCard