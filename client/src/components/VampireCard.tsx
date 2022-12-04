import { Image, Badge, Button, Card, Group, Text } from '@mantine/core';
import { Vampire } from "../lib/vampires.type";
import bloodIcon from '../images/blood-svgrepo-com.svg'
import healthIcon from '../images/health-cross-svgrepo-com.svg'

const VampireCard = ({ vampire }: { vampire: Vampire }) => {
    return (
        <Card shadow="sm" p="lg" radius="md" withBorder>
            <Card.Section>
                <Image
                    src="https://images.unsplash.com/photo-1635319520353-194ef0284701?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80"
                    height={270}
                    alt="Vampire profile"
                />
            </Card.Section>

            <Group position="apart" mt="md" mb="xs">
                <Text weight={500}>{vampire?.name}</Text>
                <Badge color="pink" variant="light">
                    Lvl: 5
                </Badge>
            </Group>

            <Text size="sm" color="dimmed">
                This is a real cool vampire sample text lorem ipsum dolor sit amet
            </Text>
            <Text size="sm" color="dimmed">
                {/* filter property for coloring svgs: https://codepen.io/sosuke/pen/Pjoqqp */}
                <img alt="blood" src={healthIcon} width="20" style={{ filter: "invert(96%) sepia(4%) saturate(1720%) hue-rotate(217deg) brightness(111%) contrast(100%)" }} /> {vampire?.current_health} / {vampire?.max_health}
            </Text>
            <Text size="sm" color="dimmed">
                <img alt="blood" src={bloodIcon} width="20" /> {vampire?.current_blood} / {vampire?.max_blood}
            </Text>

            <Button variant="light" color="blue" fullWidth mt="md" radius="md">
                See more
            </Button>
        </Card>
    )
}

export default VampireCard