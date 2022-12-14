import { Badge, Card, Divider, Grid, Group, Image, Stack, Text } from "@mantine/core"
import AttributeRow from "./AttributeRow"

const HeadquarterCard = () => {
    const headquarter = {
        name: "Headquarter",
        imageSrc: "https://images.unsplash.com/photo-1530555144580-18acc0ff779b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
        defense: 0,
        luxury: 0,
        hidden: 0,
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
                <Text weight={500}>{headquarter.name}</Text>
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
                    <AttributeRow element={headquarter} attributeName={"defense"} />
                    <AttributeRow element={headquarter} attributeName={"luxury"} />
                    <AttributeRow element={headquarter} attributeName={"hidden"} />
                </Grid>
            </Stack>
        </Card>
    )
}

export default HeadquarterCard