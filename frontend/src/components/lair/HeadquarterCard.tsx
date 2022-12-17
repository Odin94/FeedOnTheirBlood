import { Badge, Card, Divider, Grid, Group, Image, Loader, Stack, Text } from "@mantine/core"
import { useContext } from "react"
import { LairContext } from "../../pages/MyLair"
import AttributeRow from "./AttributeRow"

const HeadquarterCard = () => {
    const lairContext = useContext(LairContext)
    if (!lairContext) {
        return (
            <Loader color="grape" />
        )
    }
    const { lair, mutateHeadquarter, buttonsDisabled } = lairContext

    console.log({ lairContext })

    return (
        <Card shadow="sm" p="lg" radius="md" withBorder>
            <Card.Section>
                <Image
                    src={lair.imageSrc}
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
                    <AttributeRow element={lair} attributeName={"headquarter_defense"} buttonDisabled={buttonsDisabled} onClick={() => mutateHeadquarter.mutate({ ...lair, headquarter_defense: lair.headquarter_defense + 1 })} />
                    <AttributeRow element={lair} attributeName={"headquarter_luxury"} buttonDisabled={buttonsDisabled} onClick={() => mutateHeadquarter.mutate({ ...lair, headquarter_luxury: lair.headquarter_luxury + 1 })} />
                    <AttributeRow element={lair} attributeName={"headquarter_hidden"} buttonDisabled={buttonsDisabled} onClick={() => mutateHeadquarter.mutate({ ...lair, headquarter_hidden: lair.headquarter_hidden + 1 })} />
                </Grid>
            </Stack>
        </Card>
    )
}



export default HeadquarterCard