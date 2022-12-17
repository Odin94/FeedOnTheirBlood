import { Badge, Card, Divider, Grid, Group, Image, Stack, Text } from "@mantine/core"
import AttributeRow from "./AttributeRow"

const LaboratoryCard = ({ clanId }: { clanId: number }) => {
    const laboratoty = {
        name: "Laboratoty",
        imageSrc: "https://images.unsplash.com/photo-1551726275-c4495b31dbdc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
        equipment: 0,
        workerSlots: 0,
    }

    return (
        <Card shadow="sm" p="lg" radius="md" withBorder>
            <Card.Section>
                <Image
                    src={laboratoty.imageSrc}
                    height={270}
                    alt="Lair"
                />
            </Card.Section>

            <Group position="apart" mt="md" mb="xs">
                <Text weight={500}>{laboratoty.name}</Text>
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
                    <AttributeRow element={laboratoty} attributeName={"equipment"} buttonDisabled={false} />
                    <AttributeRow element={laboratoty} attributeName={"workerSlots"} buttonDisabled={false} />
                </Grid>
            </Stack>
        </Card>
    )
}

export default LaboratoryCard