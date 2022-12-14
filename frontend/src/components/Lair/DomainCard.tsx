import { Badge, Card, Divider, Grid, Group, Image, Stack, Text } from "@mantine/core"
import AttributeRow from "./AttributeRow"

const DomainCard = () => {
    const domain = {
        name: "Domain",
        imageSrc: "https://images.unsplash.com/photo-1561365028-65810a3d4c2a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=626&q=80",
        control: 0,  // less dangerous to hunt
        herd: 0,     // more blood per hunt
    }

    return (
        <Card shadow="sm" p="lg" radius="md" withBorder>
            <Card.Section>
                <Image
                    src={domain.imageSrc}
                    height={270}
                    alt="Lair"
                />
            </Card.Section>

            <Group position="apart" mt="md" mb="xs">
                <Text weight={500}>{domain.name}</Text>
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
                    <AttributeRow element={domain} attributeName={"control"} />
                    <AttributeRow element={domain} attributeName={"herd"} />
                </Grid>
            </Stack>
        </Card>
    )
}

export default DomainCard