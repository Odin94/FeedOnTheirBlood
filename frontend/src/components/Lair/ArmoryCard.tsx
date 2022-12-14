import { Badge, Card, Divider, Grid, Group, Image, Stack, Text } from "@mantine/core"
import AttributeRow from "./AttributeRow"

const ArmoryCard = () => {
    const armory = {
        name: "Armory",
        imageSrc: "https://images.unsplash.com/photo-1586736937926-062c138b088b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1472&q=80",
        weapons: 0,
        armor: 0,
    }

    return (
        <Card shadow="sm" p="lg" radius="md" withBorder>
            <Card.Section>
                <Image
                    src={armory.imageSrc}
                    height={270}
                    alt="Lair"
                />
            </Card.Section>

            <Group position="apart" mt="md" mb="xs">
                <Text weight={500}>{armory.name}</Text>
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
                    <AttributeRow element={armory} attributeName={"weapons"} />
                    <AttributeRow element={armory} attributeName={"armor"} />
                </Grid>
            </Stack>
        </Card>
    )
}

export default ArmoryCard