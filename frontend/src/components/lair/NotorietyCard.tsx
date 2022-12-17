import { Badge, Button, Card, Divider, Grid, Group, Image, Loader, Stack, Text } from "@mantine/core"
import { useContext } from "react"
import { LairContext } from "../../pages/MyLair"

const NotorietyCard = () => {
    const lairContext = useContext(LairContext)
    if (!lairContext) {
        return (
            <Loader color="grape" />
        )
    }
    const { lair, mutateLair: mutateHeadquarter, buttonsDisabled } = lairContext


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
                        <Button variant="light" color="grape" fullWidth radius="xl" onClick={() => mutateHeadquarter.mutate({ ...lair, notoriety_mask: lair.notoriety_mask + 1 })} disabled={buttonsDisabled}>
                            <Image alt="increment" src={"https://www.svgrepo.com/show/316388/plus.svg"} width="20" style={{ filter: "invert(100%) sepia(0%) saturate(0%) hue-rotate(121deg) brightness(113%) contrast(101%)" }} />
                        </Button>
                    </Grid.Col>

                    <Grid.Col span={9}><Text>Data Access: {lair.notoriety_data_access}</Text></Grid.Col>
                    <Grid.Col span={3}>
                        <Button variant="light" color="grape" fullWidth radius="xl" onClick={() => mutateHeadquarter.mutate({ ...lair, notoriety_data_access: lair.notoriety_data_access + 1 })} disabled={buttonsDisabled}>
                            <Image alt="increment" src={"https://www.svgrepo.com/show/316388/plus.svg"} width="20" style={{ filter: "invert(100%) sepia(0%) saturate(0%) hue-rotate(121deg) brightness(113%) contrast(101%)" }} />
                        </Button>
                    </Grid.Col>

                    <Grid.Col span={9}><Text>Political Influence: {lair.notoriety_political_influence}</Text></Grid.Col>
                    <Grid.Col span={3}>
                        <Button variant="light" color="grape" fullWidth radius="xl" onClick={() => mutateHeadquarter.mutate({ ...lair, notoriety_political_influence: lair.notoriety_political_influence + 1 })} disabled={buttonsDisabled}>
                            <Image alt="increment" src={"https://www.svgrepo.com/show/316388/plus.svg"} width="20" style={{ filter: "invert(100%) sepia(0%) saturate(0%) hue-rotate(121deg) brightness(113%) contrast(101%)" }} />
                        </Button>
                    </Grid.Col>
                </Grid>
            </Stack>
        </Card>
    )
}

export default NotorietyCard