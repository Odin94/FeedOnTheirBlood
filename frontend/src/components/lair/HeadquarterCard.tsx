import { Badge, Card, Container, Divider, Grid, Group, Image, Loader, Stack, Text } from "@mantine/core"
import { useState } from "react"
import { useHeadquarter, useUpdateHeadquarter } from "../../api/lair.types"
import AttributeRow from "./AttributeRow"

const HeadquarterCard = ({ clanId }: { clanId: number }) => {
    const [buttonsDisabled, setButtonsDisabled] = useState(false)
    const { data: headquarter, isLoading, error } = useHeadquarter(clanId)
    const mutateHeadquarter = useUpdateHeadquarter({
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
    if (error || !headquarter) {
        return (
            <Container size="xs" px="xs" color="red">
                <Text>{(error as Error).message}</Text>
            </Container>
        )
    }

    return (
        <Card shadow="sm" p="lg" radius="md" withBorder>
            <Card.Section>
                <Image
                    src={headquarter.imageSrc}
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
                    <AttributeRow element={headquarter} attributeName={"defense"} buttonDisabled={buttonsDisabled} onClick={() => mutateHeadquarter.mutate({ ...headquarter, defense: headquarter.defense + 1 })} />
                    <AttributeRow element={headquarter} attributeName={"luxury"} buttonDisabled={buttonsDisabled} onClick={() => mutateHeadquarter.mutate({ ...headquarter, luxury: headquarter.luxury + 1 })} />
                    <AttributeRow element={headquarter} attributeName={"hidden"} buttonDisabled={buttonsDisabled} onClick={() => mutateHeadquarter.mutate({ ...headquarter, hidden: headquarter.hidden + 1 })} />
                </Grid>
            </Stack>
        </Card>
    )
}

export default HeadquarterCard