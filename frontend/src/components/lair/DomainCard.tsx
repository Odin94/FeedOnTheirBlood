import { Badge, Card, Divider, Grid, Group, Image, Loader, Stack, Text } from "@mantine/core"
import { useContext } from "react"
import { LairContext } from "../../pages/MyLair"
import LairUpgradeButton from "./UpgradeButton"

const DomainCard = () => {
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
                    src={lair.domain_imageSrc}
                    height={270}
                    alt="Lair"
                />
            </Card.Section>

            <Group position="apart" mt="md" mb="xs">
                <Text weight={500}>Domain</Text>
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
                    <Grid.Col span={9}><Text>Control: {lair.domain_control}</Text></Grid.Col>
                    <Grid.Col span={3}>
                        <LairUpgradeButton attribute="domain_control" />
                    </Grid.Col>

                    <Grid.Col span={9}><Text>Herd: {lair.domain_herd}</Text></Grid.Col>
                    <Grid.Col span={3}>
                        <LairUpgradeButton attribute="domain_herd" />
                    </Grid.Col>
                </Grid>
            </Stack>
        </Card>
    )
}

export default DomainCard