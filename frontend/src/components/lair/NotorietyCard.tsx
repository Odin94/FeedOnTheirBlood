import { Badge, Card, Divider, Grid, Group, Image, Stack, Text } from "@mantine/core"
import AttributeRow from "./AttributeRow"

const NotorietyCard = () => {
    const notoriety = {
        name: "Notoriety",
        imageSrc: "https://images.unsplash.com/photo-1621264448270-9ef00e88a935?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=714&q=80",
        mask: 0,
        dataAccess: 0,
        politicalInfluence: 0,
    }

    return (
        <Card shadow="sm" p="lg" radius="md" withBorder>
            <Card.Section>
                <Image
                    src={notoriety.imageSrc}
                    height={270}
                    alt="Lair"
                />
            </Card.Section>

            <Group position="apart" mt="md" mb="xs">
                <Text weight={500}>{notoriety.name}</Text>
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
                    <AttributeRow element={notoriety} attributeName={"mask"} buttonDisabled={false} />
                    <AttributeRow element={notoriety} attributeName={"dataAccess"} buttonDisabled={false} />
                    <AttributeRow element={notoriety} attributeName={"politicalInfluence"} buttonDisabled={false} />
                </Grid>
            </Stack>
        </Card>
    )
}

export default NotorietyCard